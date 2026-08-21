const BlogInfo = ({ blog, onLike }) => {
    const { url, likes, user } = blog

    return (
        <div>
            <div>{url}</div>
            <div>
                likes {likes}
                <button onClick={() => onLike(blog)} >like</button>
            </div>
            <div>{user.username}</div>
        </div>
    )
}

export default BlogInfo