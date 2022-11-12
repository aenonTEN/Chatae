import { SidebarComponent } from './components/main-container/sidebar/sidebar.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ChatGuard } from './guards/chat.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChatDefaultPageComponent } from './components/main-container/chat-area/chat-default-page/chat-default-page.component';
import { ChatRoomComponent } from './components/main-container/chat-area/chat-room/chat-room.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import {AuthGuard, canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { ProfileComponent } from './components/profile/profile.component';

// const redirectToLogin = () => redirectUnauthorizedTo(['signin']);
// const redirectToHome = () => redirectLoggedInTo(['chat']);
const routes: Routes = [



  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: SigninComponent,
  // },
  // {
  //   path: 'login',
  //   component: SigninComponent,
  //   ...canActivate(redirectToHome),
  // },
  // {
  //   path: 'sign-up',
  //   component: SignupComponent,
  //   ...canActivate(redirectToHome),
  // },
  // {
  //   path: 'chat',
  //   component: SidebarComponent,
  //   ...canActivate(redirectToLogin),
  // },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   ...canActivate(redirectToLogin),
  // },
  
  {path: 'signin', component: SigninComponent, canActivate: [AuthGuard], data: {
    authGuardPipe: () => redirectLoggedInTo([''])
 
    }},
  {path: 'signup', component: SignupComponent, canActivate: [AuthGuard], data: {
    authGuardPipe: () => redirectLoggedInTo([''])}},

  {
    
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: '',
        component: SidebarComponent, canActivate: [AuthGuard], data: {
          authGuardPipe: () => redirectUnauthorizedTo(['signin'])}
      }
    ],
    canActivate: [ChatGuard]
    },
    {
      path: '', pathMatch: 'full', component: SigninComponent
    },

    {path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard], data: {
   authGuardPipe: () => redirectUnauthorizedTo(['signin'])
  }
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
