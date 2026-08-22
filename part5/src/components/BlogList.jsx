import Blog from "./Blog"

const BlogList = ({ blogs, onLike }) => {
    const sortedList = blogs.sort((a, b) => a.likes - b.likes).reverse()

    return (
        <div>
            {sortedList.map(blog =>
                <Blog key={blog.id} blog={blog} onLike={onLike} />
            )}
        </div>
    )
}

export default BlogList