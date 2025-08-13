import { Injectable } from '@angular/core';
import { EmployeeData } from '../employee/employee.data';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private employeeSubject = new BehaviorSubject<EmployeeData | null>(null);

  public employee$ = this.employeeSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  fetchEmployee(forceRefresh = false): Observable<EmployeeData> {
    if (!forceRefresh && this.employeeSubject.value) {
      return new Observable<EmployeeData>(observer => {
        observer.next(this.employeeSubject.value!);
        observer.complete();
      });
    }

    return this.http.get<EmployeeData>(`auth/profile`, {
      withCredentials: true,
    }).pipe(
      tap(employee => {
        this.employeeSubject.next(employee);
      }),
    );
  }

  updateEmployee(updatedEmployee: Partial<EmployeeData>) {
    return this.http.put<EmployeeData>('/profile/update', updatedEmployee, {
      withCredentials: true,
    }).pipe(
      tap(employee => {
          this.employeeSubject.next(employee);
        },
      ));
  }

}
