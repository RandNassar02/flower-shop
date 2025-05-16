import { Component } from '@angular/core';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { CartItem } from '../../model/cart.model';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  product: Product[] = [];
  currentUser: User | null = null;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getAllProduct().subscribe((products) => {
      this.product = products;
    });

    this.currentUser = this.userService.getCurrentUser();
  }

  addToCart(product: Product) {
    if (!this.currentUser) {
      alert('Please log in to add products to the cart.');
      this.router.navigate(['/login']);
      return;
    }

    const cartItem: CartItem = {
      // id: Date.now(),
      idProduct: String(product.id ?? ''),
      idUser: String(this.currentUser?.id ?? ''),
      name: product.name,
      price: product.price,
      quantity: 1,
    };
    this.productService.addToCart(cartItem).subscribe({
      next: () => {
        alert('Product added to cart');
        console.log('Product added to cart', cartItem);
        // this.router.navigate(['/cart']);
      },
      error: () => {
        alert('Failed to add product to cart');
      },
    });
  }
}
