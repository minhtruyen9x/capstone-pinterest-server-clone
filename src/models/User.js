const { DataTypes } = require('sequelize')
const sequelize = require('./connectDb')
const bcrypt = require('bcrypt')


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'nguoi_dung_id'
    },
    email: {
        type: DataTypes.STRING(100),
        unique: 'email',
        validate: {
            isEmail: {
                msg: "Email is not correct format"
            }
        },
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        validate: {
            len: {
                msg: 'password must have at least 5 char',
                args: [5, 255]
            },
        },
        allowNull: false,
        field: "mat_khau"
        // set(value) {
        //     const salt = bcrypt.genSaltSync();
        //     const hashedPassword = bcrypt.hashSync(value, salt);

        //     this.setDataValue("password", hashedPassword);
        // }
    },
    name: {
        type: DataTypes.STRING(100),
        defaultValue: 'anonymous',
        field: "ho_ten"
    },
    age: {
        type: DataTypes.INTEGER,
        field: "tuoi"
    },
    avatar: {
        type: DataTypes.STRING(255),
        // validate: {
        //     isUrl: {
        //         msg: "Url is not valid"
        //     }
        // },
        field: "anh_dai_dien"
    }
}, {
    tableName: 'nguoi_dung',
    timestamps: false,
    // bỏ column password khi query data từ DB
    defaultScope: {
        attributes: {
            exclude: ['password']
        }
    },
    hooks: {
        // Xoá property password của record được trả ra sau khi create/update thành công
        afterSave: (record) => {
            delete record.dataValues.password
            return record
        },
        beforeSave: (record) => {
            const salt = bcrypt.genSaltSync()
            const hashPassword = bcrypt.hashSync(record.dataValues.password, salt)

            record.setDataValue('password', hashPassword)
        }
    },

})

module.exports = User