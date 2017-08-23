import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// service imports
import { CvService } from './../../services/cv.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-cv',
  templateUrl: './edit-cv.component.html',
  styleUrls: ['./edit-cv.component.css']
})
export class EditCVComponent implements OnInit {

  // form variables
  user_id: String; // will hold the user's id
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
    private flashMessage: FlashMessagesService,
    private cvService: CvService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user_id = this.route.snapshot.params['user_id'];

    this.cvService.getCV(this.user_id).subscribe(cv => {
      // initialize form variables with data
      this.fullName = cv.PersonalInfor.fullName;
      this.dob = cv.PersonalInfor.dob;
      this.status = cv.PersonalInfor.status;
      this.address = cv.PersonalInfor.address;
      this.mobile = cv.PersonalInfor.mobile;
      this.email = cv.PersonalInfor.email;
      this.nationality = cv.PersonalInfor.nationality;

      this.name_of_Institution = cv.EducationInfor.name_of_Institution;
      this.start_duration = cv.EducationInfor.start_duration;
      this.end_duration = cv.EducationInfor.end_duration;
      this.qualification = cv.EducationInfor.qualification;

      this.name_of_workPlace = cv.WorkInfor.name_of_workPlace;
      this.work_start = cv.WorkInfor.work_start;
      this.work_end = cv.WorkInfor.work_end;
      this.position_held = cv.WorkInfor.position_held;
      this.responsibilities = cv.WorkInfor.responsibilities;

      this.languages = cv.Attributes.languages;
      this.interests = cv.Attributes.interests;

      this.name_of_referee = cv.Referee.name_of_referee;
      this.ref_address = cv.Referee.ref_address;
      this.ref_email = cv.Referee.ref_email;
      this.contact_num = cv.Referee.contact_num;
    });

  }

  /**
   * Updates the user cv
   * @param cv 
   */
  onEditSubmit(cv) {
    this.cvService.updateCV(this.user_id, cv).subscribe(data => {
      if(data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000 });
  
        // direct back to cv form
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show("Oops! Something went wrong", {cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
