import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cep } from '../entidades/cep';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUser():Observable<Cep>{
    return this.http.get<Cep>("https://viacep.com.br/ws/01001000/json/")
    .pipe(error=>error);
  }

}