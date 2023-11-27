const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
	dialect: 'postgres',
	database: 'incora',
	host: 'localhost',
	port: '5432',
	username: 'postgres',
	password: 'user',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})
module.exports = sequelize