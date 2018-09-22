import { Table, Column, Model, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table
class User extends Model<User> {
    @Column
    name: string

    @Column
    age: number

    @CreatedAt
    @Column createdAt: Date

    @UpdatedAt
    @Column
    updatedAt: Date;
}

export default User;