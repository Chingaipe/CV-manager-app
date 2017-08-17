import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// service import
import { ValidateService } from './../../services/validate.service';
import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // form variables
  username: String;
  name: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  
  /**
   * Handles registration form submission
   */
  onRegisterSubmit(user) {
    // Required filed validation
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // email validation
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    
    // registers the user
    this.authService.registerUser(user).subscribe(data => {
      // if registration happens
      if (data.success) {
        this.flashMessage.show('Your are now registered and can log in!', 
          { cssClass: 'alert-success', timeout: 3000 });

          // redirect to the login page
          this.router.navigate(['/login']);
      } else {
        // if not registered
        this.flashMessage.show('Oops! Something went worng, try again', 
          { cssClass: 'alert-danger', timeout: 3000 });

          // direct back to register page
          this.router.navigate(['/register']);
      }
    })
  
  }

}
