import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartCount: number = 0;

  constructor(
    public userService: UserService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    if (user) {
      this.cartService.updateCartCount(user.id);

      this.cartService.cartCountChanged.subscribe((count) => {
        this.cartCount = count;
      });
    }
  }

  loadCart(userId: number) {
    this.cartService.getCartItems(userId).subscribe((items) => {
      this.cartCount = items.length;
    });
  }
  get username(): string {
    const user = this.userService.getCurrentUser();
    return user ? user.name : '';
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
  goToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
