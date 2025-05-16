import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cart.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { UserService } from '../../services/user.service';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  userId: number = 0;
  productMap: { [key: string]: Product } = {};

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    if (user) {
      this.userId = user.id;
      this.loadCart();
    }
  }

  loadCart() {
    this.cartService.getCartItems(this.userId).subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.calculateTotalPrice();
      items.forEach((item) => {
        this.productService
          .getProductById(item.idProduct)
          .subscribe((product) => {
            this.productMap[item.idProduct] = product;
          });
      });
    });
  }

  getProductImg(idProduct: string): string {
    return this.productMap[idProduct]?.img ?? '';
  }

  calculateTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
        this.totalPrice = this.calculateTotalPrice();
      },
      error: () => {
        console.error('Error removing item');
        alert('Failed to remove item from cart.');
      },
    });
  }

  onQuantityChange(item: CartItem) {
    if (item.quantity < 1) item.quantity = 1;
    this.cartService.updateQuantity(item.id ?? 0, item.quantity).subscribe({
      next: () => {
        this.totalPrice = this.calculateTotalPrice();
      },
      error: () => {
        console.error('Error updating quantity');
        alert('Failed to update quantity.');
      },
    });
  }

  clearCart() {
    this.cartService.getCartItems(this.userId).subscribe((items) => {
      items.forEach((item, index) => {
        if (item.id !== undefined) {
          this.cartService.removeFromCart(item.id).subscribe({
            next: () => {
              if (index === items.length - 1) {
                this.cartItems = [];
                this.totalPrice = 0;
                alert('Cart cleared');
              }
            },
            error: () => {
              console.error('Failed to remove item from cart');
            },
          });
        }
      });
    });
  }
}
//   cartItems: CartItem[] = [];
//   totalPrice: number = 0;
//   userId: string = '';

//   constructor(
//     private cartService: CartService,
//     private userService: UserService
//   ) {}

//   ngOnInit(): void {
//     const user = this.userService.getCurrentUser();
//     if (user) {
//       this.userId = user.id.toString();
//       this.loadCart();
//     }
//   }

//   loadCart() {
//     this.cartService.getCartItems(this.userId).subscribe((items) => {
//       this.cartItems = items;
//       this.totalPrice = this.calculateTotalPrice();
//     });
//   }

//   calculateTotalPrice(): number {
//     return this.cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   }

//   removeItem(itemId: number) {
//     this.cartService.removeFromCart(itemId).subscribe({
//       next: () => {
//         this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
//         this.totalPrice = this.calculateTotalPrice();
//       },
//       error: (err) => {
//         console.error('Error removing item from cart:', err);
//         alert('Failed to remove item from cart.');
//       },
//     });
//   }

//   updateItemQuantity(itemId: number, quantity: number) {
//     if (quantity < 1) quantity = 1;

//     this.cartService
//       .updateQuantity(itemId, quantity)
//       .subscribe((updatedItem) => {
//         const itemIndex = this.cartItems.findIndex(
//           (item) => item.id === itemId
//         );
//         if (itemIndex !== -1 && updatedItem) {
//           this.cartItems[itemIndex].quantity = updatedItem.quantity;
//           this.totalPrice = this.calculateTotalPrice();
//         }
//       });
//   }

//   onQuantityChange(item: CartItem) {
//     if (item.quantity < 1) item.quantity = 1;
//     this.updateItemQuantity(item.id ?? 0, item.quantity);
//   }

//   clearCart() {
//     const idsToDelete = this.cartItems.map((item) => item.id);
//     idsToDelete.forEach((id) => {
//       this.cartService.removeFromCart(id).subscribe(() => {
//         this.cartItems = this.cartItems.filter((item) => item.id !== id);
//         this.totalPrice = this.calculateTotalPrice();
//       });
//     });
//   }
// }
//   cartItems: CartItem[] = [];
//   totalPrice: number = 0;
//   userId: number = 1;

//   constructor(
//     private cartService: CartService,
//     private userService: UserService
//   ) {}

//   ngOnInit(): void {
//     const user = this.userService.getCurrentUser();
//     if (user) {
//       this.userId = user.id;
//       this.loadCart();
//     }
//   }
//   loadCart() {
//     this.cartService.getCartItems(this.userId).subscribe((items) => {
//       this.cartItems = items;
//       this.totalPrice = this.calculateTotalPrice();
//     });
//   }

//   calculateTotalPrice(): number {
//     return this.cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   }

//   removeItem(itemId: number) {
//     this.cartService.removeFromCart(itemId).subscribe(() => {
//       this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
//       this.totalPrice = this.calculateTotalPrice();
//     });
//   }

//   updateItemQuantity(itemId: number, quantity: number) {
//     if (quantity < 1) quantity = 1;

//     this.cartService
//       .updateQuantity(itemId, quantity)
//       .subscribe((updatedItem) => {
//         const itemIndex = this.cartItems.findIndex(
//           (item) => item.id === itemId
//         );
//         if (itemIndex !== -1) {
//           this.cartItems[itemIndex] = updatedItem;
//         }
//         this.totalPrice = this.calculateTotalPrice();
//       });
//   }

//   onQuantityChange(item: CartItem) {
//     if (item.quantity < 1) item.quantity = 1;
//     this.updateItemQuantity(item.id, item.quantity);
//   }

//   clearCart() {
//     this.cartService.clearCart(this.userId).subscribe(() => {
//       this.cartItems = [];
//       this.totalPrice = 0;
//     });
//   }
// }

//   loadCart() {
//     this.cartService.getCartItems(this.userId).subscribe((items) => {
//       this.cartItems = items;
//       this.totalPrice = this.calculateTotalPrice();
//     });
//   }

//   calculateTotalPrice(): number {
//     return this.cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   }

//   removeItem(itemId: number) {
//     this.cartService.removeFromCart(itemId).subscribe(() => {
//       this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
//       this.totalPrice = this.calculateTotalPrice();
//     });
//   }

//   updateItemQuantity(itemId: number, quantity: number) {
//     this.cartService
//       .updateQuantity(itemId, quantity)
//       .subscribe((updatedItem) => {
//         const itemIndex = this.cartItems.findIndex(
//           (item) => item.id === itemId
//         );
//         if (itemIndex !== -1) {
//           this.cartItems[itemIndex] = updatedItem;
//         }
//         this.totalPrice = this.calculateTotalPrice();
//       });
//   }

//   clearCart() {
//     this.cartService.clearCart(this.userId).subscribe(() => {
//       this.cartItems = [];
//       this.totalPrice = 0;
//     });
//   }
// }
