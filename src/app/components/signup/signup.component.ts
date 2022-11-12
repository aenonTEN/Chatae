import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ProfileUser } from '../../models/user';
import { UsersService } from './../../services/users.service';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  // form!: FormGroup;




  signUpForm = new FormGroup(
    {
      name: new FormControl ('', [Validators.required]),
      email: new FormControl ('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordsMatchValidator() }
  );
  

  constructor(private toast: HotToastService,private userServ: UsersService,private auth: AuthService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   displayName: new FormControl('', [Validators.required]),
    //   email: new FormControl('', [Validators.email]),
    //   password: new FormControl('', [Validators.required]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }),
    // {Validators: passwordsMatchValidator()}
  }



  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  // submit() {
  //   const { name, email, password } = this.signUpForm.value;

  //   if (!this.signUpForm.valid || !name || !password || !email) {
  //     return;
  //   }
  // }


  

  signUp(){
    const { name, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !password || !email) {
      return;
    }
    // this.auth.signUp(this.form.value)
    
    
    // .pipe(

    //   switchMap(({user: {uid}}) =>
      
    //   this.userServ.addUser({uid}) ),
    // const { name, email, password } = this.signUpForm.value;

   
    
    this.auth.signUp(email, password)
      .pipe(

        switchMap(({user : {uid}}) =>
      
         this.userServ.addUser({uid, email, displayName: name})
         
       ),
        
      //  Please, to continue your access and to use the app, upload your aadhard number by navigating to your profile. We strive to make it a safe place for everyone!
      
      this.toast.observe({
        success: 'Congrats! You are signed up;',
        loading: 'Signing in',
        error: ({message}) => `${message}`
      }))
      
      .subscribe({
      
      next: () => this.router.navigate(['']),
      error: (error) => this.snackbar.open(error.message)
      
    })
  }

}
export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

