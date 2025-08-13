import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { EmployeeRank } from '../util/enums';
import * as bcrypt from 'bcrypt';

@Entity({name: "employees"})
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 16,
        nullable: false,
        name: "first_name",
    })
    firstName: string

    @Column({
        length: 16,
        nullable: true,
        name: "middle_name",
    })
    middleName: string

    @Column({
        length: 16,
        nullable: false,
        name: "last_name",
    })
    lastName: string

    @Column({
        nullable: false,
        name: "email",
    })
    email: string

    @Column({
        nullable: false,
        name: "password"
    })
    password: string

    @Column({
        nullable: true,
        name: "phone",
    })
    phone: string

    @Column({
        nullable: true,
        name: "address",
    })
    address: string

    @Column({
        nullable: true,
        name: "hire_date"
    })
    hireDate: Date

    @Column({
        nullable: true,
        name: "rank",
        default: EmployeeRank.EMPLOYEE,
        type: "enum",
        enum: EmployeeRank,
        enumName: "rank"
    })
    rank: EmployeeRank

    @Column({
        nullable: true,
        name: "access_token",
        type: "longtext"
    })
    access_token: string

    async validatePassword(password: string) {
        return bcrypt.compare(password, this.password);
    }

}