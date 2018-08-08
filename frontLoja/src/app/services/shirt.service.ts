import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../entidades/user';
import { Shirt } from '../entidades/shirt';

@Injectable()
export class ShirtService {

  constructor(private http: HttpClient) {

  }

  saveShirt(shirt: Shirt): Observable<User> {
    return this.http.post<User>("http://localhost:8000/api/shirts/insert", shirt)
      .pipe(error => error);
  }
}
