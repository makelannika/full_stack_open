const BlogInfo = ({ blog }) => {
    const { url, likes, user } = blog

    return (
        <div>
            <div>{url}</div>
            <div>
                likes {likes}
                <button>like</button>
            </div>
            <div>{user.username}</div>
        </div>
    )
}

export default BlogInfo