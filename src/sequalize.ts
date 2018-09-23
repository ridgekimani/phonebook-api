import { Sequelize } from 'sequelize-typescript';
import config from './config/database';

export const sequelize = new Sequelize({
  ...config[process.env.NODE_ENV || 'development'],
  modelPaths: [__dirname + '/models']
});

export default sequelize;
