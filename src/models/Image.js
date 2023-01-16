const { DataTypes } = require('sequelize')
const sequelize = require('./connectDb')

const Image = sequelize.define('Image', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'hinh_id'
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'nguoi_dung_id'
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'ten_hinh'
    },
    path: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'duong_dan'
    },
    desc: {
        type: DataTypes.STRING(255),
        field: 'mo_ta'
    }
}, {
    tableName: 'hinh_anh',
    timestamps: false
})

module.exports = Image