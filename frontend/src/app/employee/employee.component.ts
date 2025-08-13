import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  template: `
    @if (employeeService.employee$ | async; as employee) {
      You are logged in as {{employee.firstName}} @if (employee.middleName) {
        {{employee.middleName}}
      } {{employee.lastName}}.
    } @else {
      You are not logged in babe :(
    }
  `,
  imports: [
    AsyncPipe
  ],
})
export class EmployeeComponent implements OnInit {

  protected employeeService = inject(EmployeeService);

  ngOnInit(): void {
  }

  updateName(newName: string): void {

  }

}
