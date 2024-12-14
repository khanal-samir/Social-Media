import { Link } from "react-router-dom";

const Notifications = ({ notifications }) => {
  return (
    <>
      {notifications.map((noti) => (
        <Link
          key={noti._id}
          className="flex flex-col gap-2 p-4 border-b-2  hover:bg-gray-200 dark:hover:bg-primary-foreground"
        >
          <div className="flex items-center gap-2">
            <img
              src={noti.senderId.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />
            <p>{noti.senderId.username}</p>
            <p className="text-muted-foreground">{noti.senderId.email}</p>
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
