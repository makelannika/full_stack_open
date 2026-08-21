import { useState } from "react"
import BlogInfo from "./BlogInfo"

const Blog = ({ blog, onLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      
      {visible && <BlogInfo blog={blog} onLike={onLike} />}
    </div>  
  )
}

export default Blog