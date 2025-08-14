import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { AsyncPipe } from '@angular/common';
import { ZardLoaderComponent } from '@shared/components/loader/loader.component';
import { AuthService } from '../service/auth.service';
import { BehaviorSubject, delay, finalize } from 'rxjs';

@Component({
  selector: 'app-employee',
  standalone: true,
  template: `
    @if (isLoading$ | async) {
      <z-loader zSize="lg"/>
    } @else {
      @if (employeeService.employee$ | async; as employee) {
        {{ employee.firstName }} {{ employee.lastName }} is your name.
          You are logged in as {{ employee.firstName }} @if (employee.middleName) {
          {{ employee.middleName }}
        } {{ employee.lastName }}.
      } @else {
        You are not logged in babe :(
      }
    }
  `,
  imports: [
    AsyncPipe,
    ZardLoaderComponent,
  ],
})
export class EmployeeComponent implements OnInit {

  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(protected employeeService: EmployeeService, private authService: AuthService) {
  }

  public ngOnInit(): void {
    this.isLoadingSubject.next(true);

    this.employeeService.fetchEmployee()
      .pipe(
        delay(700),
        finalize(() => this.isLoadingSubject.next(false))
      )
      .subscribe();

    this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.isLoadingSubject.next(true);
        this.employeeService.fetchEmployee()
          .pipe(
            delay(700),
            finalize(() => this.isLoadingSubject.next(false))
          )
          .subscribe();
      } else {
        this.employeeService.clearEmployee();
        this.isLoadingSubject.next(false);
      }
    });
  }

  private updateName(newName: string): void {

  }
}
