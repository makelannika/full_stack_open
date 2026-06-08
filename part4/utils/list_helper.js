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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}