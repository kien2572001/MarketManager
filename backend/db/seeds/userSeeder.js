const seeder = require('mongoose-seed')
const faker = require('faker')

const User = require('../models/User')

let users = []
for (let i = 0; i < 10; i++) {
  users.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    hash_password: "$2b$10$BHm3/TU0/QuK6JudqCRBzufCN8o.4SIeUVj/3oloENWyUWZi/sb3i",
    avatar: faker.image.avatar(),
    role: faker.random.number({ min: 0, max: 2 })
  })
}

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost:27017/ecommerce', function () {
  // Load Mongoose models
  seeder.loadModels([
    'models/User.js'
  ])

  // Clear specified collections
  seeder.clearModels(['User'], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(users, function () {
      seeder.disconnect()
    })
  })
});