const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    username: "postgres",
    password: "user",
    database: "test"
})
module.exports = sequelize