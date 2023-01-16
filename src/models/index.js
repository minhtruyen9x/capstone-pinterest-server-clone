const sequelize = require("./connectDb");
const User = require("./User");
const Image = require("./Image");
const SaveImage = require("./saveImage");
const Comment = require("./comment");

// Mối quan hệ 1-n( 1 user sở hữu nhiều image, 1 image chỉ có 1 owner)
User.hasMany(Image, {
    as: 'images',
    foreignKey: 'userId'
})

Image.belongsTo(User, {
    foreignKey: 'userId',
    as: 'owner'
})

// Mối quan hệ n-n( 1 user sở hữu nhiều image, 1 image có thể có nhiều user thong qua savedImage)
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

// Fix tạm để query savedImage của user bằng quan hệ 1-n thay vì dùng quan hệ n-n như trên
Image.hasMany(SaveImage, {
    foreignKey: 'imageId',
})

SaveImage.belongsTo(Image, {
    foreignKey: 'imageId',
    as: 'originImage'
})


// Mối quan hệ 1-n
User.hasMany(Comment, {
    foreignKey: 'userId',
    as: 'comments'
})
Comment.belongsTo(User, {
    foreignKey: "userId",
    as: 'owner'
})

// Mối quan hệ 1-n
Image.hasMany(Comment, {
    foreignKey: 'imageId',
    as: 'comments'
})
Comment.belongsTo(Image, {
    foreignKey: "imageId",
    as: 'originImage'
})



module.exports = {
    sequelize,
    User,
    Image,
    SaveImage,
    Comment
}