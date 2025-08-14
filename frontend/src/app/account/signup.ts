import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ZardCardComponent } from '@shared/components/card/card.component';
import { AuthService } from '../service/auth.service';
import Swal, { SweetAlertEventName } from 'sweetalert2';

@Component({
  selector: 'app-account-signup',
  standalone: true,
  imports: [ReactiveFormsModule, ZardCardComponent, CommonModule],
  template: `
    <div class="h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full">
        <z-card class="w-full" zTitle="Create an account" zDescription="Enter your information below to create your account">
          <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label for="firstName" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  formControlName="firstName"
                  placeholder="John"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  [class.border-red-500]="signupForm.get('firstName')?.invalid && signupForm.get('firstName')?.touched"
                />
                @if (signupForm.get('firstName')?.invalid && signupForm.get('firstName')?.touched) {
                  <p class="text-sm text-red-600">First name is required</p>
                }
              </div>

              <div class="space-y-2">
                <label for="lastName" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  formControlName="lastName"
                  placeholder="Doe"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  [class.border-red-500]="signupForm.get('lastName')?.invalid && signupForm.get('lastName')?.touched"
                />
                @if (signupForm.get('lastName')?.invalid && signupForm.get('lastName')?.touched) {
                  <p class="text-sm text-red-600">Last name is required</p>
                }
              </div>
            </div>

            <div class="space-y-2">
              <label for="middleName" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Middle Name (Optional)
              </label>
              <input
                id="middleName"
                type="text"
                formControlName="middleName"
                placeholder="Middle name"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div class="space-y-2">
              <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <input
                id="email"
                type="email"
                formControlName="email"
                placeholder="m@example.com"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                [class.border-red-500]="signupForm.get('email')?.invalid && signupForm.get('email')?.touched"
              />
              @if (signupForm.get('email')?.invalid && signupForm.get('email')?.touched) {
                <p class="text-sm text-red-600">Please enter a valid email address</p>
              }
            </div>

            <div class="space-y-2">
              <label for="phone" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Phone (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                formControlName="phone"
                placeholder="+1 (555) 123-4567"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div class="space-y-2">
              <label for="address" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Address (Optional)
              </label>
              <input
                id="address"
                type="text"
                formControlName="address"
                placeholder="123 Main St, City, State"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div class="space-y-2">
              <label for="password" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <input
                id="password"
                type="password"
                formControlName="password"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                [class.border-red-500]="signupForm.get('password')?.invalid && signupForm.get('password')?.touched"
              />
              @if (signupForm.get('password')?.invalid && signupForm.get('password')?.touched) {
                <p class="text-sm text-red-600">Password is required</p>
              }
            </div>

            <div class="space-y-2">
              <label for="confirmPassword" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                formControlName="confirmPassword"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                [class.border-red-500]="signupForm.get('confirmPassword')?.invalid && signupForm.get('confirmPassword')?.touched"
              />
              @if (signupForm.get('confirmPassword')?.invalid && signupForm.get('confirmPassword')?.touched) {
                <p class="text-sm text-red-600">
                  @if (signupForm.get('confirmPassword')?.errors?.['required']) {
                    Confirm password is required
                  } @else if (signupForm.get('confirmPassword')?.errors?.['passwordMismatch']) {
                    Passwords do not match
                  }
                </p>
              }
            </div>

            @if (errorMessage) {
              <div class="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md">
                {{ errorMessage }}
              </div>
            }

            <div class="space-y-2">
              <button
                type="submit"
                [disabled]="signupForm.invalid || isLoading"
                class="w-full h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                @if (isLoading) {
                  <span>Creating account...</span>
                } @else {
                  <span>Create Account</span>
                }
              </button>
            </div>
          </form>
        </z-card>
      </div>
    </div>
  `,
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  protected passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (confirmPassword?.errors?.['passwordMismatch']) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }

    return null;
  }

  protected async onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const { confirmPassword, ...signupData } = this.signupForm.value;
      this.authService.signup(signupData).subscribe({
        next: async (response) => {
          await Swal.fire({
            title: "Successfully Signed Up",
            text: "Your account has been created successfully. You can now log in.",
            icon: "success",
            confirmButtonText: "Go to login",
            animation: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            theme: 'dark',
            didClose: () => {
              this.router.navigateByUrl('/login');
            }
          })
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Signup failed. Please try again.';
          this.isLoading = false;
        },
      });
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Signup failed. Please try again.';
      this.isLoading = false;
    }
  }
}
