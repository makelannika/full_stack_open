const BlogInfo = ({ blog, onLike, onRemove }) => {
  const { url, likes, user } = blog

  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  const loggedUser = JSON.parse(loggedUserJSON)
  const showRemove = loggedUser.username === user.username

  return (
    <div>
      <div>{url}</div>
      <div>
                likes {likes}
        <button onClick={() => onLike(blog)} >like</button>
      </div>
      <div>{user.username}</div>
      {showRemove && (
        <div>
          <button onClick={() => onRemove(blog)}>remove</button>
        </div>
      )}
    </div>
  )
}

export default BlogInfo