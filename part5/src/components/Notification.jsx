const Notification = ({ notification }) => (
  <div>
    {!notification && null}
    {notification && (
      <p>{notification.message}</p>
    )}
  </div>
)

export default Notification
