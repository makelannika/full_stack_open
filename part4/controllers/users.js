const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  const newUser = new User({
    username: username,
    passwordHash: await bcrypt.hash(password, 10),
    name: name,
  })

  const createdUser = await newUser.save()

  response.status(201).send(createdUser)
})

module.exports = usersRouter