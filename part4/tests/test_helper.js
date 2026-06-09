const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'url',
  },
  {
    title: 'Cat thoughts',
    author: 'Kleo',
    url: 'url',
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}