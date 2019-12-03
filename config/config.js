require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    logging: false
  },
  production: {
    use_env_variable: "DATABASE_URL"
  }
};
