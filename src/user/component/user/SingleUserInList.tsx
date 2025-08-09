import UserDetails from "./UserDetails";
import FollowAndUnfollowButtons from "./FollowAndUnfollowButtons";
import { User } from "../../models";

interface SingleUserInListProps {
  user: User;
  isFollowed: boolean;
  loading: boolean;
  toggleFollow: (user: User, shouldFollow: boolean) => void;
}

export default function SingleUserInList({
  user,
  isFollowed,
  loading,
  toggleFollow,
}: SingleUserInListProps) {
  return (
    <div className="flex justify-between items-center border-b border-slate-400 w-full py-1">
      <UserDetails
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        role={user.role}
      />
      <FollowAndUnfollowButtons
        user={user}
        isFollowed={isFollowed}
        loading={loading}
        toggleFollow={toggleFollow}
      />
    </div>
  );
}
