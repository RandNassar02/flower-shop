import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CartComponent } from './pages/cart/cart.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ProductsManagementComponent } from './pages/products-management/products-management.component';
import { OrdersComponent } from './pages/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent,
  },
  {
    path: 'usersManagement',
    component: UserManagementComponent,
  },
  {
    path: 'productsManagement',
    component: ProductsManagementComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
];
