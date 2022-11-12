import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form!: FormGroup;

  constructor(private toast: HotToastService,private auth: AuthService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  

  signIn(){
    this.auth.signIn(this.form.value).pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Logging in...',
        error: ({ message }) => `There was an error: ${message} `,
      })
    ).subscribe({
      next: () => this.router.navigate(['']),
      error: (error) => this.snackbar.open(error.message)

    })
  }

}
