import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  addProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      img: ['', Validators.required],
      DimensionsHeight: ['', Validators.required],
      DimensionsWidth: ['', Validators.required],
      Roses: ['', Validators.required],
      Wrap: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      const newProduct = this.addProductForm.value;

      this.productService.addProduct(newProduct).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          alert('Failed to add product');
          console.error(err);
        },
      });
    }
  }
}
