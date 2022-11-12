import { Message } from './../../../models/chat';
import { ChatService } from './../../../services/chat.service';
import { ProfileUser } from './../../../models/user';
import { UsersService } from './../../../services/users.service';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { combineLatest, map, of, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild('endOfChat') 
  endOfChat!: ElementRef;

  user$ = this.UsersService.currentUserProfile$;

  searchControl = new FormControl('');
  chatListControl = new FormControl();
  messageControl = new FormControl('');
  // users$ = this.UsersService.allUsers$;
  
  users$ = combineLatest([this.UsersService.allUsers$, this.user$, this.searchControl.valueChanges.pipe(startWith(''))]).pipe(
    map(([users, user, searchString]) => users.filter(u => u.displayName?.toLowerCase().includes(searchString) && u.uid !== user?.uid))
  )
 

  myChats$ = this.chatService.myChats$;

  selectedChat$ = combineLatest([
    this.chatListControl.valueChanges,
    this.myChats$
  ]).pipe(
    map(([value, chats]) => chats.find(c => c.id === value[0]))
    )


    messages$= this.chatListControl.valueChanges.pipe(
      map(value => value[0]),
      switchMap(chatId => this.chatService.getChatMessages$(chatId)),
      tap(()=> {
        this.scrollToBottom()
      })
    )
  


  constructor(private auth: AuthService, private router: Router, private UsersService: UsersService, private chatService: ChatService) { 
    
  }

  

  ngOnInit(): void {
    
  }

  onFormSubmit(form: NgForm): void {
    console.log(form.value.search);

  }


  createChat(otherUser: ProfileUser){
    this.chatService.isExistingChat(otherUser?.uid).pipe(
      switchMap(chatId=> {
        if(chatId){
          return of(chatId);
        }else {
          return this.chatService.createChat(otherUser)
        }
      })
    ).subscribe(chatId=> {
      this.chatListControl.setValue([chatId]);
    })
  }
  

  sendMessage(){
    const message = this.messageControl.value;
    const selectedChatId = this.chatListControl.value[0];


    if(message && selectedChatId){
      this.chatService.addChatMessage(selectedChatId, message).subscribe(()=>
        this.scrollToBottom()
      ); 
      this.messageControl.setValue('');
    }
  }

  scrollToBottom(){
    setTimeout(()=> {

      if(this.endOfChat){
        this.endOfChat.nativeElement.scrollIntoView({ behaviour: "smooth"})
      }
    },100);
    

  }

}
