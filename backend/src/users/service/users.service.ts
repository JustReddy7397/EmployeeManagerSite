import { Employee } from '../../entities/Employee';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../../util/validation/RegisterDto';
import { ObjectId } from 'mongodb';
import { EmployeeRank } from '../../util/enums';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
  ) {
  }

  public async findAll() {
    return await this.employeeRepo.find();
  }

  public async findOne(_id: string): Promise<Employee | null> {
    return this.employeeRepo.findOne({ where: { _id: new ObjectId(_id) } });
  }

  public async findOneByEmail(email: string): Promise<Employee> {
    return await this.employeeRepo.findOne({
      where: { email: email },
    });
  }

  public async findOneByEmailAndPassword(email: string, password: string): Promise<Employee | null> {
    return this.employeeRepo.findOneBy({ email, password });
  }

  public async findOneByName(firstName: string): Promise<Employee | null> {
    return this.employeeRepo.findOneBy({ firstName });
  }

  public async createEmployee(register: RegisterDto) {
    const { email, password } = register;
    const employee = new Employee();
    employee.email = email;
    const salt = await bcrypt.genSalt();
    employee.password = await bcrypt.hash(password, salt);
    employee.firstName = register.firstName;
    employee.middleName = register.middleName;
    employee.lastName = register.lastName;
    employee.phone = register.phone;
    employee.address = register.address;
    employee.hireDate = new Date();
    employee.rank = EmployeeRank.EMPLOYEE;
    return await this.employeeRepo.save(employee);
  }

  public async remove(id: number): Promise<void> {
    await this.employeeRepo.delete(id);
  }

  public async updateEmployee(employee: Employee) {
    return await this.employeeRepo.save(
      {
        ...employee,
        access_token: employee.access_token,
      },
    );
  }


}
