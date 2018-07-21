import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../entidades/user';

@Injectable()
export class ShirtService {

  constructor(private http: HttpClient) {
    
  }

}
