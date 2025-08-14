import { EmployeeRank } from '../../utilities/enums';

export interface EmployeeData {
  _id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  hireDate: Date
  rank: EmployeeRank;
}

export interface EmployeeSignupData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  password: string;
}
