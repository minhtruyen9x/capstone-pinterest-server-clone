const userService = require("../services/user.service")
const { response } = require("../helpers/response")

const userController = {
    updateUser: () => {
        return async (req, res, next) => {
            try {
                const { user } = res.locals
                const information = req.body
                information.id = user.id

                const data = await userService.updateUser(information)
                res.status(200).json(response(data))

            } catch (error) {
                next(error)
            }
        }
    },
    getSavedImage: () => {
        return async (req, res, next) => {
            try {
                const { user } = res.locals
                const { name, ...pageConfig } = req.query

                const data = await userService.getSavedImageWithCondition(user.id, pageConfig, { name })
                res.status(200).json(response(data))
            } catch (error) {
                next(error)
            }
        }
    },
    testImageSaved: () => {
        return async (req, res, next) => {
            try {
                const { user } = res.locals
                const { id: imageId } = req.params

                const data = await userService.testImageSaved(user.id, imageId)
                res.status(200).json(response(data))
            } catch (error) {
                next(error)
            }
        }
    },
    getProfile: () => {
        return async (req, res, next) => {
            try {
                const { user } = res.locals

                const data = await userService.getProfile(user.id)
                res.status(200).json(response(data))
            } catch (error) {
                next(error)
            }
        }
    }
}

module.exports = userController