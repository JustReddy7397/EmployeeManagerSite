import { Employee } from '../../entities/Employee';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../../util/validation/RegisterDto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>
    ) {
    }

    async findAll() {
        return await this.employeeRepo.find();
    }

    async findOne(id: number): Promise<Employee | null> {
        return this.employeeRepo.findOneBy({ id });
    }

    async findOneByEmail(email: string): Promise<Employee | null> {
        return this.employeeRepo.findOneBy({email});
    }

    async findOneByEmailAndPassword(email: string, password: string): Promise<Employee | null> {
        return this.employeeRepo.findOneBy({ email, password });
    }

    async findOneByName(firstName: string): Promise<Employee | null> {
        return this.employeeRepo.findOneBy({ firstName });
    }

    async createEmployee(register: RegisterDto) {
        const {email, password, username} = register;
        const employee = new Employee();
        employee.email = email;
        const salt = await bcrypt.genSalt();
        employee.password = await bcrypt.hash(password, salt);
        employee.firstName = username;
        return await this.employeeRepo.save(employee);
    }
    async remove(id: number): Promise<void> {
        await this.employeeRepo.delete(id);
    }

    async updateEmployee(employee: Employee) {
        return await this.employeeRepo.save(
          {
              ...employee,
              access_token: employee.access_token
          }
        );
    }


}
