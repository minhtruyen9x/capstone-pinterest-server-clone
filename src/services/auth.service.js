const { ValidationError } = require('sequelize')
const bcrypt = require('bcrypt')
const { User } = require("../models")
const { AppError } = require('../helpers/error')
const { generateToken } = require('../helpers/jwt')

const authService = {
    register: async (credentials) => {
        try {
            const isUserExist = await User.findOne({
                where: {
                    email: credentials.email
                }
            })

            if (isUserExist) {
                throw new AppError(400, "email has already been used")
            }

            const user = await User.create(credentials)
            return user
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new AppError(406, error.message)
            }

            throw error
        }
    },
    login: async (credential) => {
        const { email, password } = credential
        const isUserExist = await User.findOne({
            where: {
                email: email
            },
            attributes: {
                include: ['password']
            }
        })
        console.log(password)
        if (!isUserExist) {
            throw new AppError(400, "email or password is not correct")
        }

        const isMatch = bcrypt.compareSync(password, isUserExist.dataValues.password)
        if (!isMatch) {
            throw new AppError(400, "email or password is not correct")
        }

        return generateToken(isUserExist)
    }
}

module.exports = authService