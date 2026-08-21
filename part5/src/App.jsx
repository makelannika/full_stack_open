import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null)
    }, 3000)

    return () => clearTimeout(timer)
  }, [notification])

  const notify = (message, type) => {
    setNotification({ message, type })
  }

  const handleLogin = async credentials => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

    } catch (err) {
      console.log(err)
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = event => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async blog => {
    blogFormRef.current.toggleVisibility()

    try {
      const created = await blogService.create(blog)

      const updatedlist = blogs.concat(created)
      setBlogs(updatedlist)

      notify(`a new blog ${created.title} by ${created.author} added`, 'success')
    } catch (err) {
      console.log(err)
    }
  }

  const handleLike = async blog => {
      const blogToUpdate = {
          ...blog,
          likes: blog.likes + 1
      }

      try {
          const updatedBlog = await blogService.update(blog.id, blogToUpdate)

          setBlogs(blogs.map(blog => 
            blog.id === updatedBlog.id ? updatedBlog : blog
          ))
      } catch (err) {
          console.log(err)
      }
  }

  return (
    <div>
      {!user && <LoginForm onLogin={handleLogin} notification={notification} />}
      
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm onCreate={createBlog} />
          </Togglable>
          <BlogList blogs={blogs} onLike={handleLike} />
        </div>
        )}
    </div>
  )
}

export default App