const {Sequelize} = require('sequelize')


const sequelize = new Sequelize({
	dialect: 'postgres',
	database: process.env.DB_NAME || 'incora',
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT || '5432',
	username: process.env.DB_USERNAME || 'postgres',
	password: process.env.DB_PASSWORD || 'user',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})
module.exports = sequelize