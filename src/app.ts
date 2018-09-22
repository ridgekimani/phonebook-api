import express from "express"
import bodyParser from "body-parser"
import * as dotenv from "dotenv"
import { UserController } from "./controllers"

dotenv.config();

const app: express.Application = express();

app.use(bodyParser.json());

const urlPrefix = '/api/v1';

app.use(`${urlPrefix}/user`, UserController);


export default app
