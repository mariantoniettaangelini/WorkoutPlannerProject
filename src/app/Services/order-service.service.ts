import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/i-product';
import { IOrder } from '../Models/i-order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://localhost:7161/api/shop';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products`, {
      withCredentials: true,
    });
  }

  addToCart(order: IOrder): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-to-cart`, order, {
      withCredentials: true,
    });
  }

  getCart(userId: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.apiUrl}/cart/${userId}`, {
      withCredentials: true,
    });
  }

  updateCartOrder(order: IOrder): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update`, order, {
      withCredentials: true,
    });
  }

  removeFromCart(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${orderId}`, {
      withCredentials: true,
    });
  }

  checkout(userId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/checkout/${userId}`,
      {},
      { withCredentials: true }
    );
  }
}
