import { UsersService } from './services/users.service';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularChat';

  user$ = this.UsersService.currentUserProfile$;

  constructor(public auth: AuthService, private router: Router, private UsersService: UsersService) {}

  signOut() {
    this.auth.signOut().subscribe({
      next: () => this.router.navigate(['signin'])
    });
  }
}
