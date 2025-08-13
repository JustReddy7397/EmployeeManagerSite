import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { Home } from './home/home';

export const routes: Routes = [
  {
    title: "Home",
    path: "",
    component: Home
  },
  {
    title: "Your Profile",
    path: "employee",
    component: EmployeeComponent
  }
]
