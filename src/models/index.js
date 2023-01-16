const sequelize = require("./connectDb");
const User = require("./User");
const Image = require("./Image");
const SaveImage = require("./saveImage");

// Mối quan hệ 1-n( 1 user sở hữu nhiều image, 1 image chỉ có 1 owner)
User.hasMany(Image, {
    as: 'images',
    foreignKey: 'userId'
})

Image.belongsTo(User, {
    foreignKey: 'userId',
    as: 'owner'
})

// Mối quan hệ n-n( 1 user sở hữu nhiều image, 1 image có thể có nhiều 1 owner)
User.belongsToMany(Image, {
    through: SaveImage,
    foreignKey: 'userId',
    as: 'savedImages'
})

Image.belongsToMany(User, {
    through: SaveImage,
    foreignKey: 'imageId',
    as: 'usersSave'
})


module.exports = {
    sequelize,
    User,
    Image,
    SaveImage
}