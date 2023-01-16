class AppError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
    }
}

const handleErrors = (error, req, res, next) => {

    if (!(error instanceof AppError)) {
        console.log(error)
        error = new AppError(500, "Internal Server")
    }

    const { statusCode, message } = error
    res.status(statusCode).json({
        message,
        status: 'error',
        statusCode
    })

    next()
}

module.exports = {
    AppError,
    handleErrors
}
