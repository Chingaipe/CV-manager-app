import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// service import
import { CvService } from './../../services/cv.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // variable
  cv: any; // holds the data from db
  user_id: any; // holds user's id

  constructor(
    private cvService: CvService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // on init get cv 
    this.getUserID(); // gets the user's id first

    this.cvService.getCV(this.user_id).subscribe(cv => {
      this.cv = cv;
    });

  }

  /**
   * Gets the user's id from local storage
   */
  getUserID() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.user_id = user.id;
    return this.user_id;
  }

  /**
   * Deletes the user's cv
   * @param user_id 
   */
  onDeleteClick(user_id) {
    // consider pop up dialog for confirmation
    this.cvService.deleteCV(user_id).subscribe(data => {
      // flash message
      this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/dashboard']);
    });
  }

}
