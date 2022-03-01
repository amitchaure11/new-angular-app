import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Post {
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = "https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts";

  private upersons: User[] = [
    {"firstName": "Amit","lastName": "Roy","phone": "9876543210", "id": 1},
    {"firstName": "Aakash","lastName": "Choudhury", "phone": "9876584431","id": 2},
    { "firstName": "Arun","lastName": "Dey", "phone": "5748493812","id": 3},
    {  "firstName": "Vikash", "lastName": "Trivedi", "phone": "9873625261", "id": 4},
    {"firstName": "Gaurav","lastName": "Gupta", "phone": "7002873284", "id": 5}
  ];

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

  getUsersFromData(): User[] {
    return this.upersons;
  }

  addUser(user: User) {
    user.id = this.upersons.length + 1;
    this.upersons.push(user);

  }
  updateUser(user: User) {
    const index = this.upersons.findIndex(u => user.id === u.id);
    this.upersons[index] = user;
  }
  deleteUser(user: User) {
    this.upersons.splice(this.upersons.indexOf(user), 1);
  }

}
