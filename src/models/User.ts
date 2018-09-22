import { Table, Column, Model, CreatedAt, UpdatedAt, HasMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import Contact from './Contact';

@Table
class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public userId: number;

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

  @HasMany(() => Contact)
  contacts: Contact[];
}

export default User;
