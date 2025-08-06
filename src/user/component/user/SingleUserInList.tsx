import UserDetails from "./UserDetails";
import FollowAndUnfollowButtons from "./FollowAndUnfollowButtons";


interface SingleUserInListProps {
  user: any;
}

export default function SingleUserInList({ user }: SingleUserInListProps) {
  return (
    <div
      className="flex justify-between items-center border-b border-gray-400 w-full py-1"
    >
      <UserDetails
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        role={user.role}
      />
      <FollowAndUnfollowButtons user={user} />
    </div>
  );
}
