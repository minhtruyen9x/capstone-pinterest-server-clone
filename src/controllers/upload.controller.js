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

            const url = configs.DOMAIN_NAME ?
                `${configs.DOMAIN_NAME}/${file.path
                    .replace(/\\/g, '/')
                    .replace('public/', '')
                }` :
                `http://localhost:${configs.PORT}/${file.path
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