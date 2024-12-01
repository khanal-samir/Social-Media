import PostActivities from "./PostActivities";

const SinglePost = ({ tweet = {} }) => {
  return (
    <div className="flex flex-col gap-2 p-2 border-b-2 overflow-hidden">
      <header className="flex gap-3 text-sm sm:text-base ">
        <img
          src={tweet.owner.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <h2 className="font-semibold">{tweet.owner.username}</h2>
        <span className="text-muted-foreground">{tweet.owner.email}</span>
        <span className="text-muted-foreground">
          {new Date(tweet.createdAt).toLocaleDateString()}
        </span>
      </header>

      <div className="flex flex-col gap-2">
        <p className="text-md sm:text-base font-light">{tweet.content}</p>
        {tweet?.media ? (
          <img
            src={tweet.media}
            alt="tweet media"
            className=" sm:px-2 object-contain rounded-xl sm:rounded-2xl"
          />
        ) : null}
      </div>
      <PostActivities tweet={tweet} />
    </div>
  );
};

export default SinglePost;
