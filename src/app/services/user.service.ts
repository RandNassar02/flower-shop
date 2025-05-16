import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public cartCount = 0;

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      map((users) => users.length > 0),
      catchError(() => {
        return throwError(() => new Error('Email check failed'));
      })
    );
  }

  login(email: string, hashedPassword: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map((users) => {
        const user = users[0];
        if (user && user.password === hashedPassword) {
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      catchError((err) => throwError(() => err))
    );
  }
  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user && user.Role === 'admin';
  }
}
