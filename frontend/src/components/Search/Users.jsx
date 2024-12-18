import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const user = useSelector((state) => state.user.users);
  console.log(user);

  return (
    <div className="flex flex-col gap-2 border-b-2 p-2">
      <h1 className="font-bold text-muted-foreground text-center text-xl">
        Users
      </h1>
      {user.length > 0 ? (
        user.map((u) => (
          <Link
            to={`/profile/${u?._id}`}
            key={u?._id}
            className="w-fit flex items-center gap-3 hover:bg-primary-foreground rounded-md"
          >
            <img
              src={u.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <h2 className="font-semibold">{u?.username}</h2>
            <span className="text-muted-foreground">{u?.email}</span>
          </Link>
        ))
      ) : (
        <h1 className="font-bold text-muted-foreground mt-14 text-center text-xl">
          No Users found
        </h1>
      )}
    </div>
  );
};

export default Users;
