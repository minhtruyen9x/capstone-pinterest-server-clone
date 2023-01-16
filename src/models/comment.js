const { DataTypes, Sequelize } = require('sequelize')
const sequelize = require('./connectDb')

const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'binh_luan_id'
    },
    imageId: {
        type: DataTypes.INTEGER,
        field: 'hinh_id',
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'nguoi_dung_id',
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "mo_ta"
    },
    createAt: {
        type: DataTypes.DATE,
        field: 'ngay_binh_luan',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'binh_luan',
    timestamps: false
})

module.exports = Comment