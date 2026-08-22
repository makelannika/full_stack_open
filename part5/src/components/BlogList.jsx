import Blog from './Blog'

const BlogList = ({ blogs, onLike, onRemove }) => {
  const sortedList = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedList.map(blog =>
        <Blog key={blog.id} blog={blog} onLike={onLike} onRemove={onRemove} />
      )}
    </div>
  )
}

export default BlogList