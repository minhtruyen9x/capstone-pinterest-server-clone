const jwt = require("jsonwebtoken")
const configs = require("../config")
const { AppError } = require("../helpers/error")
const { User } = require("../models")

const extractTokenFromHeader = (headers) => {
    const bearerToken = headers.authorization

    const [prefix, token] = bearerToken.split(' ')

    if (prefix !== "Bearer") {
        throw new AppError(401, 'Invalid Token')
    }

    return token
}

const authorization = async (req, res, next) => {
    try {
        const token = extractTokenFromHeader(req.headers)
        // Kiểm tra token có hợp lệ không
        const payload = jwt.verify(token, configs.SECRET_KEY)

        // Mặc dù token hợp lệ nhưng vẫn có trường hợp user đã bị xóa khỏi database
        // nên kiểm tra xem user có trong DB không
        // const user = await User.findByPk(payload.id)
        // if (!user) {
        //     next(new AppError(401, 'Invalid Token'))
        //     return
        // }

        res.locals.user = payload

        next()
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            next(new AppError(401, 'Invalid token'))
            return
        }
        next(error)
    }
}

module.exports = authorization