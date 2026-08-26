import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogInfo from './BlogInfo'

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

test('onLike handler is called when like button is clicked', async () => {
  const mockLike = vi.fn()

  render(<BlogInfo blog={blog} loggedUser={loggedUser} onLike={mockLike} />)

  const user = userEvent.setup()
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockLike.mock.calls).toHaveLength(2)
})
