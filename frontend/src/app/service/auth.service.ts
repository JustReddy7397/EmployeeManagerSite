import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EmployeeData, EmployeeSignupData } from '../employee/employee.data';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private employeeService: EmployeeService) {
    this.checkAuthStatus().subscribe();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3001/api/auth/login',
      { email, password },
      { withCredentials: true },
    ).pipe(
      tap((response) => {
        this.isAuthenticatedSubject.next(true);
        console.log('Login successful:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        this.isAuthenticatedSubject.next(false);
        console.error('Login failed:', error);
        throw error;
      }),
    );
  }

  signup(data: EmployeeSignupData): Observable<any> {
    console.log(data);
    return this.http.post('http://localhost:3001/api/auth/signup', {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      password: data.password,
    }, {
      withCredentials: true,
    })
      .pipe(
        tap((response) => {
          console.log('Signup successful:', response);
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(JSON.stringify(error));
          throw error;
        }),
      );
  }

  logout(): Observable<any> {
    return this.http.post('http://localhost:3001/api/auth/logout',
      {},
      { withCredentials: true },
    ).pipe(
      tap((response) => {
        this.isAuthenticatedSubject.next(false);
        console.log('Logout successful:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        this.isAuthenticatedSubject.next(false);
        console.error('Logout failed:', error);
        throw error;
      }),
    );
  }

  checkAuthStatus(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:3001/api/auth/status', { withCredentials: true })
      .pipe(
        tap(() => {
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(() => {
          this.isAuthenticatedSubject.next(false);
          this.employeeService.clearEmployee();
          return of(false);
        }),
      );
  }


}
