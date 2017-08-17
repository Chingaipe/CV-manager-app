import { Component, OnInit } from '@angular/core';

// service ipmorts
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // form variables
  email: String;
  password: String;

  constructor(
    private authService:AuthService,
    private router: Router,
    private flashmessages:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  /**
   * Handles logging in user
   */
  onLoginSubmit(user) {
    // authenticates the user
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success) {
        // we authenticate the user adn store relevant data
        this.authService.storeUserData(data.token, data.user);
        // flash message and redirect
        this.flashmessages.show('Welcome, you are now logged in as - '+data.user.username , 
          {cssClass: 'alert-success', 
          timeout: 5000});
          // redirect to page
        this.router.navigate(['dashboard']);
      } else {
        // not successfull
        this.flashmessages.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        // redirect to page
        this.router.navigate(['login']);
      }
    });
    
  }

}
