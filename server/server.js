
const dns = require('node:dns')

dns.setServers(['1.1.1.1'])

require('dotenv').config()

const connectDB = require('./config/db')
const app = require('./app')

const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`CampusPulse server is running on port ${PORT}`)
  })
}

startServer()
