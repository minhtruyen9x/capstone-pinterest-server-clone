const configs = require("../config")
const { response } = require("../helpers/response")
const imageService = require("../services/image.service")

const imgController = {
    getImage: () => {
        return async (req, res, next) => {
            try {
                const { name, ...pageConfig } = req.query

                const data = await imageService.getAllImagesWithCondition(pageConfig, { name })

                res.status(200).json(response(data))
            } catch (error) {
                next(error)
            }
        }
    },
    getImagById: () => {
        return async (req, res, next) => {
            try {
                const { id } = req.params
                const data = await imageService.getImageById(id)
                res.status(200).json(response(data))
            } catch (error) {
                next(error)
            }
        }
    },
    createImage: () => {
        return async (req, res, next) => {
            try {
                const { user } = res.locals
                const information = req.body
                information.userId = user.id
                const data = await imageService.createImage(information)
                res.status(200).json(response(data))
            } catch (error) {
                next(error)
            }
        }
    },
    saveImage: () => {
        return async (req, res, next) => {
            try {
                const { user } = res.locals
                const { id: imageId } = req.params
                const data = await imageService.saveImage(user.id, imageId)
                res.status(200).json(response(data))
            } catch (error) {
                next(error)
            }
        }
    },
    deleteImage: () => {
        return async (req, res, next) => {
            try {
                const { user } = res.locals
                const { id: imageId } = req.params
                const data = await imageService.deleteImage(user.id, imageId)
                res.status(200).json(response(data))

            } catch (error) {
                next(error)
            }
        }
    }
}

module.exports = imgController