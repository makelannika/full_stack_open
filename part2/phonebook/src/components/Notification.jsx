const Notification = ({ error, success }) => {
    if (!error && !success) {
        return null
    }

    return (
        <div className={error ? 'error' : 'success'}>
            {error ? error : success}
        </div>
    )
}

export default Notification