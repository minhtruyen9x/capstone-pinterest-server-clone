const { Op } = require("sequelize")
const { AppError } = require("../helpers/error")
const { Image, User } = require("../models")
const saveImage = require("../models/saveImage")

const imageService = {
    getAllImagesWithCondition: async (pageConfig, filter) => {
        const { page = 1, pageSize = 10 } = pageConfig
        const { name } = filter
        try {
            const total = await Image.count({
                where: {
                    name: {
                        [Op.like]: name ? `%${name}%` : '%'
                    }
                },
            })

            const data = await Image.findAll({
                where: {
                    name: {
                        [Op.like]: name ? `%${name}%` : '%'
                    }
                },
                // convert sang number để không gây lỗi query syntax của DB
                limit: Number(pageSize),
                offset: (Number(page) - 1) * Number(pageSize) || 0
            })

            return {
                images: data,
                pagination: {
                    total,
                    page: page,
                    pageSize: pageSize
                }
            }

        } catch (error) {
            throw error
        }
    },
    getImageById: async (id) => {
        try {
            const image = Image.findByPk(id, {
                include: 'owner',
                attributes: {
                    exclude: ['userId']
                }
            })

            if (!image) {
                throw new AppError(404, "image not found")
            }
            return image
        } catch (error) {
            throw error
        }
    },
    createImage: async (data) => {
        try {
            const isValidImage = await Image.findOne({
                include: 'owner',
                where: {
                    name: data.name,
                    userId: data.userId
                }
            })

            if (isValidImage) {
                throw new AppError(400, 'Image name has already exist')
            }

            const createdImg = await Image.create(data)
            // await createdImg.setUsersSave(data.userId)
            // console.log(createdImg.__proto__)
            return 'ok'
        } catch (error) {
            throw error
        }
    },

    saveImage: async (userId, imageId) => {
        try {
            const user = await User.findByPk(userId)
            // console.log(user.__proto__)

            // imageId nhận từ params là string mà khi query cần id dạng number để query không bị lỗi
            // convert id sang number để cú pháp query DB chính xác
            const isImageSaved = await user.hasSavedImage(+imageId)
            if (isImageSaved) {
                return 'ok'
            }
            await user.addSavedImage(imageId)
            return "ok"
        } catch (error) {
            throw error
        }
    },

    deleteImage: async (userId, imageId) => {
        try {
            const image = await Image.findByPk(imageId)
            if (!image) {
                throw new AppError(404, "Image not Found")
            }

            if (image.dataValues.userId !== userId) {
                throw new AppError(403, "Not have permission")
            }

            await image.destroy()
            console.log(image.__proto__)
            return 'ok'
        } catch (error) {
            throw error
        }
    }
}

module.exports = imageService