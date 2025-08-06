import BadgeAndAuthorName from "../card/BadgeAndAuthorName";

interface UserDetailsProps {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

export default function UserDetails({
  firstName,
  lastName,
  role,
  email,
}: UserDetailsProps) {
  return (
    <div className="flex flex-col items-start">
      <BadgeAndAuthorName
        firstName={firstName}
        lastName={lastName}
        role={role}
      />
      <p className="text-xs pb-1">{email}</p>
    </div>
  );
}
