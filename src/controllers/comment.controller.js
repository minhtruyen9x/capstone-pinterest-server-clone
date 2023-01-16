const { response } = require("../helpers/response")
const commentService = require("../services/comment.service")

const commentController = {
    createComment: () => {
        return async (req, res, next) => {
            try {
                const { user } = res.locals
                const { id } = req.params
                const data = req.body

                data.userId = user.id
                data.imageId = id
                const createdComment = await commentService.createComment(data)
                res.status(200).json(response('ok'))

            } catch (error) {
                next(error)
            }
        }
    },
    getCommentByImage: () => {
        return async (req, res, next) => {
            try {
                const { id } = req.params
                const data = await commentService.getCommentByImage(id)
                res.status(200).json(response(data))

            } catch (error) {
                next(error)
            }
        }
    }
}

module.exports = commentController