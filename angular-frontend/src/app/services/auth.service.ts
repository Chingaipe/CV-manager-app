import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any; // this is the user-object from the registration form

  constructor(private http: Http) { }

  // Send the form data to the register backend api
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  // Send the form data to the register backend api
  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  /**
   * Gets the users profile
   */
  getProfile() {
    let headers = new Headers();
    this.loadToken(); // runs the loadToken()
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  /**
   * Stores user data in local storage
   */
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  /**
   * Loads the token from localstorage
   */
  loadToken(){
    const token = localStorage.getItem('id_token');  // gets token from local storage
    this.authToken = token;
  }

   /**
   * Checks if the user is logged in
   */
  loggedIn() {
    return tokenNotExpired('id_token');
  }

  /**
   * Handles user logout form the system
   */
  logout() {
    this.authToken = null;
    this.user = null;

    localStorage.clear(); 
  }
}
