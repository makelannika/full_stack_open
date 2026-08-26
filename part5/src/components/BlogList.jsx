import Blog from './Blog'

const BlogList = ({ blogs, loggedUser, onLike, onRemove }) => {
  const sortedList = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedList.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          loggedUser={loggedUser}
          onLike={onLike}
          onRemove={onRemove} />
      )}
    </div>
  )
}

export default BlogList