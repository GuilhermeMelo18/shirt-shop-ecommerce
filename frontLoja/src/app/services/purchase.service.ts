import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Purchase } from '../entidades/purchase';

@Injectable()
export class PurchaseService {

  constructor(private http: HttpClient) {

  }

  // Save Purchase
  savePurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>("http://localhost:8000/api/purchases/insert", purchase)
      .pipe(error => error);
  }

  // Get Purchases
  getAllPurchases(): Observable<Purchase> {
    return this.http.get<Purchase>("http://localhost:8000/api/purchases/get-all")
      .pipe(error => error);
  }

    // Get Demands By User
    getAllDemandsByUser(id: string): Observable<Purchase> {
      return this.http.get<Purchase>("http://localhost:8000/api/purchases/get-by-user/"+id)
        .pipe(error => error);
    }

}
