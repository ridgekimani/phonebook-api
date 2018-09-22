import chalk from "chalk"
import app from "./app"
import sequelize from "./sequalize"

import errorHandler from "errorHandler"

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler())
}


const port = process.env.PORT || 3000;

(async () => {
    await sequelize.sync({force: true})
    app.listen(port, () => {
        console.log(chalk.yellow(`Listening at http://localhost:${port}/`))
    })
})()

