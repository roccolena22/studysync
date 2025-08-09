import BadgeAndAuthorName from "../card/BadgeAndAuthorName";
import { useNavigate } from "react-router-dom";

interface UserDetailsProps {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  id: string;
}

export default function UserDetails({
  firstName,
  lastName,
  role,
  email,
  id
}: UserDetailsProps) {
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate(`/studysync/profile/${id}`);
  };

  return (
    <div className="flex flex-col items-start">
      <div onClick={handleNavigateToProfile} className="cursor-pointer">
        <BadgeAndAuthorName
          firstName={firstName}
          lastName={lastName}
          role={role}
        />
      </div>
      <p className="text-xs pb-1">{email}</p>
    </div>
  );
}
