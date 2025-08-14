import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeRank } from '../util/enums';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';

@Entity({name: "employees"})
export class Employee {

    @ObjectIdColumn()
    public _id: ObjectId

    @Column({
        length: 16,
        nullable: false,
    })
    public firstName: string

    @Column({
        length: 16,
        nullable: true,
    })
    public middleName: string

    @Column({
        length: 16,
        nullable: false,
    })
    public lastName: string

    @Column({
        nullable: false,
        name: "email",
    })
    public email: string

    @Column({
        nullable: false,
        name: "password"
    })
    public password: string

    @Column({
        nullable: true,
        name: "phone",
    })
    public phone: string

    @Column({
        nullable: true,
        name: "address",
    })
    public address: string

    @Column({
        nullable: true,
        name: "hire_date"
    })
    public hireDate: Date

    @Column({
        nullable: true,
        name: "rank",
        default: EmployeeRank.EMPLOYEE,
        type: "enum",
        enum: EmployeeRank,
        enumName: "rank"
    })
    public rank: EmployeeRank

    public async validatePassword(password: string): Promise<boolean> {
        if (!password || !this.password) {
            console.log(password, this.password);
            return false;
        }

        try {
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            console.error('Password validation error:', error);
            return false;
        }
    }

}