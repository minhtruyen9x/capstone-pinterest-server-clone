const configs = require("../config")
const { AppError } = require("../helpers/error")
const { response } = require("../helpers/response")

const upload = () => {
    return async (req, res, next) => {
        try {
            const file = req.file

            if (!file) {
                throw new AppError(400, 'Missing file')
            }
            console.log()
            const url = `http://localhost:${configs.PORT}/${file.path
                    .replace(/\\/g, '/')
                    .replace('public/', '')
                }`

            res.status(200).json(response(url))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = upload