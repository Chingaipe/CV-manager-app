import { Component, OnInit } from '@angular/core';

// service ipmorts
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // variables
  user: Object;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService,

  ) { }

  ngOnInit() {
    // load user data
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user; // store user-profile in user object
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
