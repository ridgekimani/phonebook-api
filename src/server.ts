import chalk from "chalk"
import app from "./app"

import errorHandler from "errorHandler"

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler())
}


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(chalk.yellow(`Listening at http://localhost:${port}/`))
})