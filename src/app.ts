import express from "express"
import * as dotenv from "dotenv"
import { HelloController } from "./controllers"

dotenv.config();

const app: express.Application = express()

app.use('/', HelloController)

export default app
