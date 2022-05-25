require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: process.env.PASSWORD_DEV,
    database: "intellistock",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "b9019ad98581d6",
    password: process.env.PASSWORD_PROD,
    database: "heroku_9cc0d17edd12a97",
    host: "us-cdbr-east-05.cleardb.net",
    dialect: "mysql"
  }
}
