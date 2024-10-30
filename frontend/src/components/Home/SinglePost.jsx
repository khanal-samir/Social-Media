import PostActivities from "./PostActivities";

const SinglePost = () => {
  return (
    <div className="flex flex-col gap-2 p-2 border-b-2 overflow-hidden">
      <header className="flex gap-3 text-sm sm:text-base ">
        <img
          src="https://pbs.twimg.com/profile_images/1802974703453347840/ToZ2m6K1_400x400.jpg"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <h2 className="font-semibold">FullName</h2>
        <span className="text-muted-foreground">username</span>
        <span className="text-muted-foreground">5m</span>
      </header>

      <div className="flex flex-col gap-2">
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          laudantium, similique unde culpa dolores laboriosam temporibus libero
          velit autem! Consequatur rem laborum maxime ad temporibus quae fugit,
          totam quibusdam in?
        </p>
        <img
          src="https://pbs.twimg.com/media/GbEUNjfX0AA_7pe?format=jpg&name=large"
          alt="tweet media"
          className=" sm:px-2 object-contain rounded-xl sm:rounded-2xl"
        />
      </div>
      <PostActivities />
    </div>
  );
};

export default SinglePost;
