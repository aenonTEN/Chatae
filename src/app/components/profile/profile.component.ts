import { ProfileUser } from './../../models/user';
import { UsersService } from './../../services/users.service';
import { FormGroup, FormControl } from '@angular/forms';
import { concatMap } from 'rxjs';
import { ImageUploadService } from './../../services/image-upload.service';
import { AuthService } from './../../services/auth.service';
import { user, User } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { untilDestroyed, UntilDestroy} from '@ngneat/until-destroy'

@UntilDestroy()

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  constructor(private auth: AuthService, private ImageUploadService: ImageUploadService, private toast: HotToastService, private UsersService: UsersService) { }

  user$ = this.UsersService.currentUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl('')
  })


  ngOnInit(): void {
    this.UsersService.currentUserProfile$.pipe(
      untilDestroyed(this)
    ).subscribe((user) => {
      this.profileForm.patchValue({ ...user});
    })
  }

  uploadImage(event: any, user: ProfileUser){
    this.ImageUploadService.uploadImage(event.target.files[0], 'images/profile/${user.uid}').pipe(
      this.toast.observe(
        {
          loading: 'Image is being uploaded..',
          success: 'Image uploaded!',
          error: 'There is an error in uploading'
        }
      ),
      concatMap((photoURL) => this.UsersService.updateUser({uid: user.uid,photoURL}))
    ).subscribe();
  }


  saveProfile(){
    const profileData = this.profileForm.value;
    this.UsersService.updateUser(profileData).pipe(
      this.toast.observe({
        loading: `Updating data...`,
        success: `Data has been updated`,
        error: `There occured an error in updating the data`
      })
    ).subscribe();
    
  }

}
