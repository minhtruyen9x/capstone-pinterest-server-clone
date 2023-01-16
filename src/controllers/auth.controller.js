const { response } = require("../helpers/response")
const authService = require("../services/auth.service")

const register = () => {
    return async (req, res, next) => {
        try {
            const credentials = req.body
            const user = await authService.register(credentials)
            res.status(201).json(response(user))
        } catch (error) {
            next(error)
        }
    }
}

const login = () => {
    return async (req, res, next) => {
        try {
            const credential = req.body
            const user = await authService.login(credential)
            res.status(200).json(response(user))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    register,
    login
}