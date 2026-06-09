const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('When there are blogs initially saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('when fetching blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('blogs\' id field is \'id\' not \'_id\'', async () => {
      const response = await api.get('/api/blogs')

      const blogs = response.body

      assert.ok(
        blogs.every(blog => 'id' in blog && !('_id' in blog))
      )
    })
  })

  describe('adding a new blog', () => {
    test('succeeds with status code 201 with valid data', async () => {
      const newBlog = {
        title: 'pspsps',
        author: 'Kleo',
        url: 'url',
        likes: 100,
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(
        blogsAtEnd.length,
        helper.initialBlogs.length + 1
      )

      assert.strictEqual(response.body.title, newBlog.title)
      assert.strictEqual(response.body.author, newBlog.author)
      assert.strictEqual(response.body.url, newBlog.url)
    })

    test('fails with status code 400 if title is missing', async () => {
      const newBlog = { url: 'Missing title' }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with status code 400 if url is missing', async () => {
      const newBlog = { title: 'Missing url' }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('if not defined, likes are set to 0', async () => {
      const newBlog = {
        title: 'favorite snacks',
        author: 'Kleo',
        url: 'url',
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 with valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const ids = blogsAtEnd.map(b => b.id)
      assert(!ids.includes(blogToDelete.id))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  describe('updating likes of a blog', () => {
    test('succeeds with status code 200 with valid id', async () => {
      const existingBlogs = await helper.blogsInDb()
      let blogToUpdate = existingBlogs[0]
      const likesAtStart = blogToUpdate.likes

      blogToUpdate.likes = likesAtStart + 1

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, likesAtStart + 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})