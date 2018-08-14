import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../entidades/user';
import { Shirt } from '../entidades/shirt';

@Injectable()
export class ShirtService {

  // Save Filter from Main Page
  saveFilterShirts: string;

  constructor(private http: HttpClient) {
    this.saveFilterShirts = undefined;
  }

  // Save shirt create by user
  saveShirt(shirt: Shirt): Observable<Shirt> {
    return this.http.post<Shirt>("http://localhost:8000/api/shirts/insert", shirt)
      .pipe(error => error);
  }

  // Remove Shirt By User Id
  removeShirt(id: string): Observable<Shirt> {
    return this.http.post<Shirt>("http://localhost:8000/api/shirts/remove/" + id, "")
      .pipe(error => error);
  }

  // Get shirt by Id
  getShirtByIdUser(id: String): Observable<Shirt> {
    return this.http.get<Shirt>("http://localhost:8000/api/shirts/get-by-user-id/" + id)
      .pipe(error => error);
  }

  //Get All Shirts
  getShirts(): Observable<Shirt> {
    return this.http.get<Shirt>("http://localhost:8000/api/shirts")
      .pipe(error => error);
  }

  // add shirts to bag user
  addBagUser(idUser, idShirt): Observable<Shirt> {
    return this.http.post<Shirt>("http://localhost:8000/api/shirts/add-bag-user/" + idUser + "/" + idShirt, "")
      .pipe(error => error);
  }

  //Get Bag e Author By Id User
  getBagUser(idUser): Observable<Shirt> {
    return this.http.get<Shirt>("http://localhost:8000/api/shirts/get-shirt-author/" + idUser)
      .pipe(error => error);
  }

  // Likes Shirts 
  likeShirts(idShirt: string): Observable<any> {
    return this.http.post<any>("http://localhost:8000/api/shirts/likes-shirt/" + idShirt,"")
      .pipe(error => error);
  }

  //Get Top Likes Shirts
  getTopLikedShirts(): Observable<Shirt> {
    return this.http.get<Shirt>("http://localhost:8000/api/shirts/top-likes-shirt/")
      .pipe(error => error);
  }
}
