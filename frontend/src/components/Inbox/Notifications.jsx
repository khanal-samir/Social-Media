import { Link } from "react-router-dom";

const Notifications = ({ notifications }) => {
  if (notifications.length === 0)
    return (
      <div className="p-4 text-center font-bold text-muted-foreground">
        No notifications
      </div>
    );
  return (
    <>
      {notifications.map((noti) => (
        <Link
          to={`/profile/${noti.senderId._id}`}
          key={noti._id}
          className="flex flex-col gap-2 p-4 border-b-2  hover:bg-gray-200 dark:hover:bg-primary-foreground"
        >
          <div className="flex justify-between ">
            <div className="flex items-center gap-2">
              <img
                src={noti.senderId.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <p className="sm:text-base text-sm">{noti.senderId.username}</p>
              <p className="text-muted-foreground hidden lg:block">
                {noti.senderId.email}
              </p>
            </div>
            <p className="text-muted-foreground sm:text-base text-xs ">
              {new Date(noti.createdAt).toDateString()}
            </p>
          </div>

          <div
            className={` font-semibold ${noti.type === "follow" ? "text-green-600" : noti.type === "like" ? "text-red-600" : "text-blue-600"}`}
          >
            {noti.type === "follow"
              ? `${noti.senderId.username} started following you.`
              : noti.type === "like"
                ? `${noti.senderId.username} liked your post.`
                : `${noti.senderId.username} commented on your post.`}
          </div>
        </Link>
      ))}
    </>
  );
};

export default Notifications;
