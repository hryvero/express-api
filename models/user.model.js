const { DataTypes} = require('sequelize');

const sequelize = require("../db/db.config");

const User = sequelize.define("User", {
    first_name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        validate: {
            len: [2, 20],
            isAlpha: true,
        }
    }, last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [2, 20],
            isAlpha: true,
        }
    }, email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }, phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [4, 11],
            isNumeric: true
        }
    }, password: {
        type: DataTypes.STRING,
        allowNull: false

    }
}, {
    freezeTableName: true,
    timestamps: false,
});


sequelize.sync()
module.exports = User

