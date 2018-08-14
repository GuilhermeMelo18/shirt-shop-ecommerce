import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../entidades/user';


@Injectable()
export class UsuarioService {

  // User Session
  userSave: User;

  constructor(private http: HttpClient) {
    this.userSave = new User();
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>("http://localhost:8000/api/users/get-by-id/" + id)
      .pipe(error => error);
  }

  getUserShop(): Observable<User> {
    return this.http.get<User>("http://localhost:8000/api/users/get-user-shop")
      .pipe(error => error);
  }
  
  getUserLikesGain(id: string): Observable<any> {
    return this.http.get<any>("http://localhost:8000/api/users/get-likes-gain/"+id)
      .pipe(error => error);
  }

  getUserSession(): Observable<User> {
    return this.http.get<User>("http://localhost:8000/api/users/get-session")
      .pipe(error => error);
  }

  loginUser(user: User): Observable<User> {
    return this.http.post<User>("http://localhost:8000/api/users/login", user)
      .pipe(error => error);
  }

  logOutUser(): Observable<User> {
    return this.http.get<User>("http://localhost:8000/api/users/logout")
      .pipe(error => error);
  }

  signInWithFacebook() {

  }

  signUpUser(user: User): Observable<User> {
    return this.http.post<User>("http://localhost:8000/api/users/insert", user)
      .pipe(error => error);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.post<User>("http://localhost:8000/api/users/update/" + id, user)
      .pipe(error => error);
  }

  removeUser(id: string, user: User): Observable<User> {
    return this.http.post<User>("http://localhost:8000/api/users/remove/" + id, user)
      .pipe(error => error);
  }

}