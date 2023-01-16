const { Sequelize } = require('sequelize')
const configs = require('../config')

const sequelize = new Sequelize(
    configs.DB_NAME,
    configs.DB_USER,
    configs.DB_PASSWORD,
    {
        dialect: configs.DB_DIALECT,
        host: configs.DB_HOST,
        port: configs.DB_PORT
    })

sequelize.authenticate()
    .then(() => {
        console.log('Connect DB successfull')
    })
    .catch((error) => {
        console.log('connect DB fail\n', error)
    })

module.exports = sequelize