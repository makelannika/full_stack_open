const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialUsers = async () => {
  return [
    {
      username: 'Rob',
      passwordHash: await bcrypt.hash('robspswd', 10),
      name: 'Robert',
    },
    {
      username: 'Keke',
      passwordHash: await bcrypt.hash('kekespswd', 10),
      name: 'Kleo',
    }
  ]
}

const initialBlogs = [
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'url',
    likes: 2,
  },
  {
    title: 'Cat thoughts',
    author: 'Kleo',
    url: 'url',
    likes: 9,
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
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