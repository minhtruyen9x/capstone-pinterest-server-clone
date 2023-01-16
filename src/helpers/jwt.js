const jwt = require('jsonwebtoken')
const configs = require('../config')
const EXPIRES_IN = 60 * 60 * 12

const generateToken = (payload, expiresIn = EXPIRES_IN) => {

    const token = jwt.sign({
        id: payload.id,
        email: payload.email
    }, configs.SECRET_KEY, {
        expiresIn
    })

    return {
        token,
        expiresIn
    }
}

module.exports = { generateToken }