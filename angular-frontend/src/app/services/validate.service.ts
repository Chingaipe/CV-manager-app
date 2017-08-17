import { element } from 'protractor';
import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  /**
   * Checks if all the fields has been filled in, it check the 
   * user object that is passed to it from the form
   */
  validateRegister(user) {
    
    if(user.username == undefined || user.name == undefined || 
      user.email == undefined || user.password == undefined) {
        return false;
      } else {
        return true;
      }
  }

  /**
   * Validates the email, to see if its actually an email
   * @param email is the email typed into the form
   */
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
