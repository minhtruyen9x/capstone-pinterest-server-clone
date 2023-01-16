const { Comment } = require("../models")

const commentService = {
    createComment: async (data) => {
        try {
            const createdComment = await Comment.create(data)
            return createdComment
        } catch (error) {
            throw error
        }
    },
    getCommentByImage: async (imageId) => {
        try {
            const data = await Comment.findAll({
                where: {
                    imageId
                },
                attributes: {
                    exclude: ['imageId', 'userId']
                },
                include: [{
                    association: 'owner',
                    attributes: {
                        exclude: ['age', 'password']
                    }
                }]
            })

            return data
        } catch (error) {
            throw error
        }
    }
}

module.exports = commentService