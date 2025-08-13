import { EmployeeRank } from '../../utilities/enums';

export interface EmployeeData {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  hireDate: Date
  rank: EmployeeRank;
}
