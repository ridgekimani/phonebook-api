import chalk from 'chalk';
import app from './app';
import sequelize from './sequalize';

const environment = process.env.NODE_ENV || 'development';

const port = process.env.PORT || 3000;

(async () => {
  environment === 'development' && (await sequelize.sync({ force: true, logging: true }));
  app.listen(port, () => {
    console.log(chalk.yellow(`Listening at PORT ${port}/`));
  });
})();
