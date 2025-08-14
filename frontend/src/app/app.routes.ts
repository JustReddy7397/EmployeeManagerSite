import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { Home } from './home/home';
import { LoginComponent } from './account/login';
import { SignupComponent } from './account/signup';

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
  },
  {
    title: "Login",
    path: "login",
    component: LoginComponent
  },
  {
    title: "Sign Up",
    path: "signup",
    component: SignupComponent
  }
]
