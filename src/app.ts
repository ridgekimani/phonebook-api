import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Register, Authenticate, CreateContact, ReadContacts, UpdateContact, DeleteContact } from './controllers';

dotenv.config();

const app: express.Application = express();

app.use(bodyParser.json());

app.use(cors());

const urlPrefix = '/api/v1';

// Auth
app.use(`${urlPrefix}/register/`, Register);
app.use(`${urlPrefix}/authenticate/`, Authenticate);

// Contacts
app.use(`${urlPrefix}/contact`, [CreateContact, UpdateContact, DeleteContact]);
app.use(`${urlPrefix}/contacts`, ReadContacts);

export default app;
