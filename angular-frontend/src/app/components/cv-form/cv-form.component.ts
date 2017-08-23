import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// service imports
import { CvService } from './../../services/cv.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CvFormComponent implements OnInit {
// form variables
  user: any; // will hold the user's id
  // personnal info
  fullName: String;
  dob: String;
  status: String;
  address: String;
  mobile: String;
  email:String;
  nationality: String;
  // profile pic comes here
  // education qualification
  name_of_Institution: String;
  start_duration: Date;
  end_duration: Date;
  qualification: String;
  // work experience
  name_of_workPlace: String;
  work_start: Date;
  work_end: Date;
  position_held: String;
  responsibilities: String;
  // personal attribute
  languages: String;
  interests: String;
  // references
  title: String;
  name_of_referee: String;
  ref_address: String;
  ref_email: String;
  contact_num: String;


  constructor(
    private cvService: CvService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserID();
  }

  /**
   * Gets the user's id from local storage
   */
  getUserID() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.user = user.id;
    return this.user;
  }

  /**
   * Handles the cv-form data that is submitted
   */
  onSubmitCV(cvForm) {
    // create the cv
    this.cvService.saveCV(cvForm).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Your CV has been successfully created', 
        { cssClass: 'alert-success', timeout: 3000 });

        // redirect to the dashboard page
        this.router.navigate(['/dashboard']);
      } else {
        // if not registered
        this.flashMessage.show('Oops! Something went worng, try again', 
        { cssClass: 'alert-danger', timeout: 3000 });

        // direct back to cv form
        this.router.navigate(['/create-cv']);
      }
    });
  }

}
