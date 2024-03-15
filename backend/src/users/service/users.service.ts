import {Employee} from "../../entities/Employee";
import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>
    ) {}

    async findAll() {
        return await this.employeeRepo.find();
    }

    async findOne(id: number): Promise<Employee | null> {
        return this.employeeRepo.findOneBy({ id });
    }

    async findOneByEmail(email: string): Promise<Employee | null> {
        return this.employeeRepo.findOneBy({ email });
    }

    async findOneByName(firstName: string): Promise<Employee | null> {
        return this.employeeRepo.findOneBy({ firstName });
    }

    async createEmployee(employee: Employee) {
        return await this.employeeRepo.save(employee);
    }

    async remove(id: number): Promise<void> {
        await this.employeeRepo.delete(id);
    }

}
