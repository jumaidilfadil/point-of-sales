require('dotenv/config')

module.exports = {
  baseSite: process.env.BASE_SITE,
  serverPort: process.env.SERVER_PORT,
  database: {
    mysql: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  },
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY
}
