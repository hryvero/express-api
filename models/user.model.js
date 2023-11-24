const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require("../db/db.config");

const User = sequelize.define("User", {
    // id:{
    //     type: DataTypes.INTEGER,
    //     primaryKey: true
    // },
    first_name: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        allowNull: false,
        validate: {
            isAlpha: true,
        }
    }, last_name: {
        type: DataTypes.STRING,
        allowNull: true
    }, email: {
        type: DataTypes.STRING,
        allowNull: false
    }, phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, password: {
        type: DataTypes.STRING,
        allowNull: false

    }
}, {
    freezeTableName: true,
    timestamps: false, // schema: "user", // Replace 'your_schema' with the actual schema name
});

sequelize.sync({force: true})
module.exports = User
// return User.schema("public");
