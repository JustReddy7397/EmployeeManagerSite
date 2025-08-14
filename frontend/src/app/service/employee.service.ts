import { Injectable } from '@angular/core';
import { EmployeeData } from '../employee/employee.data';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  public employeeSubject = new BehaviorSubject<EmployeeData | null>(null);

  public employee$ = this.employeeSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  public fetchEmployee(): Observable<any> {
    return this.http.get<EmployeeData>('http://localhost:3001/api/auth/profile', { withCredentials: true })
      .pipe(
        tap(employee => this.employeeSubject.next(employee))
      );
  }

  public updateEmployee(updatedEmployee: Partial<EmployeeData>) {
    return this.http.put<EmployeeData>('http://localhost:3001/profile/api/update', updatedEmployee, {
      withCredentials: true,
    }).pipe(
      tap(employee => {
          this.employeeSubject.next(employee);
        },
      ));
  }

  public clearEmployee(): void {
    this.employeeSubject.next(null);
  }

}
