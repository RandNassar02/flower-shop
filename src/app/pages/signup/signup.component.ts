import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hashPassword } from '../../utils/hash-password';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, TranslatePipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;
  emailExistsError: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        Role: ['user'],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { passwordMismatch: true };
  }

  async onSignup() {
    if (this.signupForm.invalid) return;

    const { name, email, password, Role } = this.signupForm.value;
    const userToSend = { name, email, password, Role };

    this.userService.checkEmailExists(email).subscribe({
      next: (exists) => {
        this.emailExistsError = exists;

        if (exists) {
          this.emailExistsError = true;
        } else {
          this.userService.signup(userToSend).subscribe({
            next: () => {
              alert(`Signup successful, ${name}`);
              this.emailExistsError = false;
              this.signupForm.reset();
              this.router.navigate(['/login']);
            },
            error: () => {
              console.error('Signup failed');
            },
          });
        }
      },
      error: () => {
        console.error('Error checking email existence');
      },
    });
  }
}
