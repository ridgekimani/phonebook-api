import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { Register, Authenticate, CreateContact, ReadContacts, UpdateContact } from './controllers';

dotenv.config();

const app: express.Application = express();

app.use(bodyParser.json());

const urlPrefix = '/api/v1';

// Auth
app.use(`${urlPrefix}/register/`, Register);
app.use(`${urlPrefix}/authenticate/`, Authenticate);

// Contacts
app.use(`${urlPrefix}/contact`, [CreateContact, UpdateContact]);
app.use(`${urlPrefix}/contacts`, ReadContacts);

export default app;
