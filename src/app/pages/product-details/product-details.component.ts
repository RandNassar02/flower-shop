import { Component } from '@angular/core';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { User } from '../../model/user.model';
import { CartItem } from '../../model/cart.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-product-details',
  imports: [TranslatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  products?: Product;
  currentUser: User | null = null;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.error('Invalid route ID');
      return;
    }
    this.currentUser = this.userService.getCurrentUser();
    console.log('Fetching product with ID:', id);

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.products = product;
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      },
    });
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
      },
      error: () => {
        alert('Failed to add product to cart');
      },
    });
  }
}
