import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const loggedUser = {
  username: 'user'
}

const blog = {
  url: 'url',
  title: 'title',
  author: 'author',
  likes: 5,
  user: {
    username: 'user',
    name: 'user',
    token: 'token'
  }
}

test('renders title and author by default', () => {
  render(<Blog blog={blog} />)

  const titleAndAuthorElement = screen.getByText('title author')
  const urlElement = screen.queryByText('url')
  const likesElement = screen.queryByText('likes 5')

  expect(titleAndAuthorElement).toBeDefined()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('renders url, likes and user when view button is clicked', async () => {
  render(<Blog blog={blog} loggedUser={loggedUser} />)

  const user = userEvent.setup()
  const view = screen.getByText('view')
  await user.click(view)

  const urlElement = screen.getByText('url')
  const likesElement = screen.getByText('likes 5')
  const userElement = screen.getByText('user')

  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
  expect(userElement).toBeDefined()
})