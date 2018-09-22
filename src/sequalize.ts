import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op as any,
  database: process.env.database || 'phonebook',
  username: process.env.username || 'phonebook',
  password: process.env.password || 'phonebook',
  modelPaths: [__dirname + '/models']
});

export default sequelize;
