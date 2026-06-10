const errorHandler = (error, request, response, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(error.message)
  }

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  next(error)
}

module.exports = { errorHandler }