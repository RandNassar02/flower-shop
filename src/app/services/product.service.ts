import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { CartItem } from '../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:3000/products';
  apiUrlCart = 'http://localhost:3000/cart';
  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addToCart(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.apiUrlCart, cartItem);
  }

  getCartByUserId(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrlCart}?userId=${userId}`);
  }

  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(
      `${this.apiUrlCart}/${cartItem.id}`,
      cartItem
    );
  }

  removeFromCart(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlCart}/${cartItemId}`);
  }

  clearCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlCart}?userId=${userId}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
