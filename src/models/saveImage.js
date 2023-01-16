const { DataTypes, Sequelize } = require('sequelize')
const sequelize = require('./connectDb')

const saveImage = sequelize.define('saveImage', {
    imageId: {
        type: DataTypes.INTEGER,
        field: 'hinh_id'
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'nguoi_dung_id'
    },
    createAt: {
        type: DataTypes.DATE,
        field: 'ngay_luu',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'luu_anh',
    timestamps: false
})

module.exports = saveImage