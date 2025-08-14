import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ZardCardComponent } from '@shared/components/card/card.component';
import { AuthService } from '../service/auth.service';
import { AccountNotFoundAlert } from '../../utilities/alerts';

@Component({
  selector: 'app-account-login',
  standalone: true,
  imports: [ReactiveFormsModule, ZardCardComponent, CommonModule],
  template: `
    <div class="h-175 flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full">
        <z-card class="w-full" zTitle="Login to your account" zDescription="Enter your email below to login to your account">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
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
                [class.border-red-500]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
              />
              @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
                <p class="text-sm text-red-600">Please enter a valid email address</p>
              }
            </div>

            <div class="space-y-2">
              <div class="flex items-center">
                <label for="password" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <a href="#" class="ml-auto text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                formControlName="password"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                [class.border-red-500]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
              />
              @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
                <p class="text-sm text-red-600">Password is required</p>
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
                [disabled]="loginForm.invalid || isLoading"
                class="w-full h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                @if (isLoading) {
                  <span>Signing in...</span>
                } @else {
                  <span>Login</span>
                }
              </button>
            </div>
          </form>
        </z-card>
      </div>
    </div>
  `,
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: async (response) => {
          await this.router.navigateByUrl('/employee');
        },
        error: (error) => {
          AccountNotFoundAlert();
          this.isLoading = false;
        },
      });
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      this.isLoading = false;
    }
  }
}
