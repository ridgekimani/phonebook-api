import { Table, Column, Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}

export default User;
