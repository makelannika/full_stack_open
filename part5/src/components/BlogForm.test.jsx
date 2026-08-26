import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('callback function is called with correct info when creating a blog' , async () => {
  const user = userEvent.setup()
  const mockCreate = vi.fn()

  render(<BlogForm onCreate={mockCreate} />)

  const titleField = screen.getByLabelText('title')
  const authorField = screen.getByLabelText('author')
  const urlField = screen.getByLabelText('url')

  await user.type(titleField, 'new blog')
  await user.type(authorField, 'new author')
  await user.type(urlField, 'new url')

  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(mockCreate.mock.calls).toHaveLength(1)
  expect(mockCreate).toHaveBeenCalledWith({
    title: 'new blog',
    author: 'new author',
    url: 'new url'
  })
})