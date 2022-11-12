import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //inject in constructor private CommonService: CommonService
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  // login(): void {
  //   this.CommonService.loginWithGoogle();
  // }
}
