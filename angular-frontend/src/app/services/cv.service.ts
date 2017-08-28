import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CvService {

  constructor(private http: Http) { }

  /**
   * Gets user's cv
   * @param user_id 
   */
  getCV(user_id) {
    return this.http.get('http://localhost:3000/api/cvs/' + user_id)
      .map(res => res.json());
  }

  /**
   * Sends the cv-form data to the backend for db insert
   * @param cv 
   */
  saveCV(cv) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/api/cvs/create', cv, {headers: headers})
      .map(res => res.json());
  }

  
  updateCV(user_id, cv) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put('http://localhost:3000/api/cvs/update/' + user_id, cv, {headers: headers})
      .map(res => res.json());
  }

  deleteCV(user_id) {
    return this.http.delete('http://localhost:3000/api/cvs/delete/' + user_id)
      .map(res => res.json());
  }

  exportCV(id) {
    return this.http.get('http://localhost:3000/api/cvs/export/' + id)
    .map(res => res.json());
  }

}
