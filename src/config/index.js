require('dotenv').config()
const configs = {
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    DOMAIN_NAME: process.env.DOMAIN_NAME,

    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
}

module.exports = configs