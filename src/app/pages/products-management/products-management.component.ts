import { Component } from '@angular/core';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.scss',
})
export class ProductsManagementComponent {
  products: Product[] = [];
  newProduct: Product = {
    name: '',
    price: 0,
    img: '',
    DimensionsHeight: '',
    DimensionsWidth: '',
    Roses: '',
    Wrap: '',
  };

  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProduct().subscribe((products) => {
      console.log('Loaded products:', products);
      this.products = products;
    });
  }

  startEdit(product: Product) {
    if (product) {
      this.editingProduct = { ...product };
    }
  }

  saveEdit() {
    if (this.editingProduct && this.editingProduct.id) {
      this.productService
        .updateProduct(this.editingProduct.id!.toString(), this.editingProduct)
        .subscribe(() => {
          this.loadProducts();
          this.editingProduct = null;
        });
    }
  }

  cancelEdit() {
    this.editingProduct = null;
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}
