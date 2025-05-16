import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CartItem } from '../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';
  cartCountChanged = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  getCartItems(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}?idUser=${userId}`);
  }

  updateCartCount(userId: number) {
    this.getCartItems(userId).subscribe((items) => {
      this.cartCountChanged.emit(items.length);
    });
  }

  addToCart(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.apiUrl, item).pipe(
      tap(() => {
        this.updateCartCount(Number(item.idUser));
      })
    );
  }

  updateCartItem(id: number, item: Partial<CartItem>): Observable<CartItem> {
    return this.http.patch<CartItem>(`${this.apiUrl}/${id}`, item);
  }

  removeFromCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateQuantity(id: number, quantity: number): Observable<CartItem> {
    return this.http.patch<CartItem>(`${this.apiUrl}/${id}`, { quantity });
  }
}
