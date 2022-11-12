import { ChatService } from './../../../services/chat.service';
import { ProfileUser } from './../../../models/user';
import { UsersService } from './../../../services/users.service';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {

  user$ = this.UsersService.currentUserProfile$;

  searchControl = new FormControl('');
  chatListControl = new FormControl();
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
  


  constructor(private auth: AuthService, private router: Router, private UsersService: UsersService, private chatService: ChatService) { 
    
  }

  

  ngOnInit(): void {
    
  }

  onFormSubmit(form: NgForm): void {
    console.log(form.value.search);

  }


  createChat(otherUser: ProfileUser){
    this.chatService.createChat(otherUser).subscribe();
  }

}
