import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { Register } from './controllers';

dotenv.config();

const app: express.Application = express();

app.use(bodyParser.json());

const urlPrefix = '/api/v1';

app.use(`${urlPrefix}/register/`, Register);

export default app;
