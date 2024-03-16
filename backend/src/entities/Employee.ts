import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Address} from "../util/types";

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
        nullable: false,
        name: "phone",
    })
    phone: string

    @Column({
        nullable: false,
        name: "address",
    })
    address: string

    @Column({
        nullable: false,
        name: "hire_date"
    })
    hireData: Date

}