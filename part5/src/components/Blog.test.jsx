import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    url: 'test url',
    title: 'test title',
    author: 'test author',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('test title test author')

  expect(element).toBeDefined()
})