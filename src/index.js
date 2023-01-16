const express = require('express')
const path = require('path')

const configs = require('./config')
const { sequelize } = require('./models')
const router = require('./router/v1')
const { handleErrors } = require('./helpers/error')

const app = express()

app.use(express.json())
// app.use(express.urlencoded())
app.use(express.static(path.resolve(__dirname, '../public')))

sequelize.sync({ alter: true })

app.use('/api/v1', router)

app.use(handleErrors)

app.listen(configs.PORT, () => {
    console.log("Server is ready")
})