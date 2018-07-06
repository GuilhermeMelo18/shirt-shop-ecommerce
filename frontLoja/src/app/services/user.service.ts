import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../entidades/user';


@Injectable()
export class UsuarioService {

  userSave: User;

  constructor(private http: HttpClient) {
    this.userSave = new User();
  }

  getUserById(id:string):Observable<User>{
    return this.http.get<User>("http://localhost:8000/api/users/get-by-id/"+id)
    .pipe(error=>error);
  }

 loginUser(user:User):Observable<User>{
   return this.http.post<User>("http://localhost:8000/api/users/login", user)
   .pipe(error=>error); 
  }
  
  signInWithFacebook() {
  
  }

  signUpUser(user:User):Observable<User>{
    return this.http.post<User>("http://localhost:8000/api/users/insert", user)
    .pipe(error=>error); 
  }
  
  updateUser(id:string, user:User):Observable<User>{
    return this.http.post<User>("http://localhost:8000/api/users/update"+id, user)
    .pipe(error=>error); 
  }
  
  removeUser(id:string , user:User):Observable<User>{
    return this.http.post<User>("http://localhost:8000/api/users/isert"+id , user)
    .pipe(error=>error); 
  }

}