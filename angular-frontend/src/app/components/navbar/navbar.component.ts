import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// services import
import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // variable
  username: String; // to be displayed in the navbar

  constructor(
    public authService: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getUsername() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.username = user.username;
    return this.username;
  }

  /**
   * Logs the user out of the system
   */
  onLogout() {
    this.authService.logout();
    // flash logout msg
    this.flashMessages.show('You have succefully logged out, later!', 
      {cssClass: 'alert-success', timeout: 3000});
    // redirects to home
    this.router.navigate(['/']);
    return false;
  }

}
