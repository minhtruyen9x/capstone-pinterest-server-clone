const { ValidationError, Op } = require("sequelize")
const { AppError } = require("../helpers/error")
const { User } = require("../models")

const userService = {
    updateUser: async (data) => {
        try {
            const user = await User.findByPk(data.id, {
                attributes: {
                    include: ['password']
                }
            })

            if (!user) {
                throw new AppError(401, "Invalid token")
            }

            await user.update(data)
            // console.log(user)
            return 'Ok'
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new AppError(400, error.message)
            }
            throw error
        }
    },
    getSavedImageWithCondition: async (userId, pageConfig, filter) => {
        const { page = 1, pageSize = 10 } = pageConfig
        const { name } = filter
        try {
            const user = await User.findByPk(userId)

            if (!user) {
                throw new AppError(401, "Invalid token")
            }

            const data = await user.getSavedImages()
            // const data = await user.getImagesSave({
            // {
            //     include: {
            //         association: 'savedImages',
            //         where: {
            //             name: {
            //                 [Op.like]: name ? `%${name}%` : '%'
            //             }
            //         },
            //         limit: Number(pageSize),
            //         offset: (Number(page) - 1) * Number(pageSize) || 0
            //     }
            // }
            // })

            return data
        } catch (error) {
            throw error
        }
    },
    testImageSaved: async (userId, imageId) => {
        try {
            const user = await User.findByPk(userId)

            if (!user) {
                throw new AppError(401, "Invalid token")
            }
            // console.log(user.__proto__)
            // imageId nhận từ params là string mà khi query cần id dạng number để query không bị lỗi
            // convert id sang number để cú pháp query DB chính xác
            const isImageSaved = await user.hasSavedImage(+imageId)
            if (!isImageSaved) {
                throw new AppError(400, 'Image not saved yet')
            }
            return "ok"
        } catch (error) {
            throw error
        }
    },
    getProfile: async (id) => {
        try {
            const user = await User.findByPk(id)

            if (!user) {
                throw new AppError(401, "Invalid token")
            }
            return user
        } catch (error) {
            throw error
        }
    }
}

module.exports = userService