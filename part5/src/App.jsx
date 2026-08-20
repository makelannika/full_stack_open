import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const handleLogin = async credentials => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = event => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async blog => {
    try {
      const created = await blogService.create(blog)

      const updatedlist = blogs.concat(created)
      setBlogs(updatedlist)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {!user && <LoginForm onLogin={handleLogin}/>}
      
      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm onCreate={createBlog}/>
          <BlogList blogs={blogs}></BlogList>
        </div>
        )}
    </div>
  )
}

export default App