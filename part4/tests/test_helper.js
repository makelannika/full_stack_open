const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialUsers = async () => {
  return [
    {
      username: 'Alice',
      passwordHash: await bcrypt.hash('alicespswd', 10),
      name: 'Alice',
    },
    {
      username: 'Bob',
      passwordHash: await bcrypt.hash('bobspswd', 10),
      name: 'Bob',
    }
  ]
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const initialBlogs = async () => {
  const users = await usersInDb()

  return [
    {
      url: 'url',
      title: 'Type wars',
      author: 'Robert C. Martin',
      user: users[0].id,
      likes: 2
    },
    {
      url: 'url',
      title: 'Cat thoughts',
      author: 'Kleo',
      user: users[0].id,
      likes: 9
    }
  ]
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialUsers,
  initialBlogs,
  blogsInDb,
  usersInDb,
}