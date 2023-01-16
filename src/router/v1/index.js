const express = require('express')

const authController = require('../../controllers/auth.controller')
const imgController = require('../../controllers/img.controller')
const userController = require('../../controllers/user.controller')
const uploadController = require('../../controllers/upload.controller')

const authorization = require('../../middlewares/authorization')
const upload = require('../../middlewares/upload')


const Router = express.Router()
// Authtenticate
Router.post('/register', authController.register())
Router.post('/login', authController.login())

// User
Router.get('/users/profiles', authorization, userController.getProfile())
Router.get('/users/save-images', authorization, userController.getSavedImage())
Router.get('/users/save-images/:id', authorization, userController.testImageSaved())
Router.put('/users', authorization, userController.updateUser())

// Upload image
Router.post('/images/upload', upload.single("image"), uploadController())

// Image
Router.get('/images', imgController.getImage())
Router.get('/images/:id', imgController.getImagById())
Router.post('/images', authorization, imgController.createImage())
Router.post('/images/:id', authorization, imgController.saveImage())
Router.delete('/images/:id', authorization, imgController.deleteImage())



module.exports = Router