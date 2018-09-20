import express from "express"
import { HelloController } from "./controllers"

const app: express.Application = express()

app.use('/', HelloController)

export default app
