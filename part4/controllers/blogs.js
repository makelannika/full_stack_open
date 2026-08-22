const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user.id,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  const populatedBlog = await Blog
    .findById(savedBlog.id)
    .populate('user', { username: 1, name: 1, id: 1 })

  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== user.id) {
    return response.status(403).json({ error: 'forbidden' })
  }

  await blog.deleteOne()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1, id: 1 })

  blogToUpdate.likes = request.body.likes

  const updatedBlog = await blogToUpdate.save()

  response.status(200).send(updatedBlog)
})

module.exports = blogsRouter