import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { hashPassword } from '../../utils/hash-password';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    try {
      // const hashedPassword = await hashPassword(password);
      this.userService.login(email, password).subscribe({
        next: (user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          alert(`Welcome, ${user.name}`);
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('Login failed. Please check your email and password.');
        },
      });
    } catch (error) {
      alert('Something went wrong during login.');
    }
  }
}
