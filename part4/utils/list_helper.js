const _ = require('lodash')

const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return null

  const reducer = (favorite, blog) => {
    return favorite.likes > blog.likes ? favorite : blog
  }

  return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return null

  const blogsByAuthor = _.countBy(blogs, 'author')

  const [author, blogCount] = _.maxBy(
    _.toPairs(blogsByAuthor),
    pair => pair[1]
  )

  return {
    author: author,
    blogs: blogCount
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return null

  const likesByAuthor = _.reduce(blogs, (acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  const [author, totalLikes] = _.maxBy(
    _.toPairs(likesByAuthor),
    pair => pair[1]
  )

  return {
    author: author,
    likes: totalLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}