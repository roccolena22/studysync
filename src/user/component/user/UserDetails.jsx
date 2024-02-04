import BadgeAndAuthorName from "../card/BadgeAndAuthorName";

export default function UserDetails({ firstName, lastName, role, email }) {
  return (
    <div className="flex flex-col items-start" data-testid="user-details">
      <BadgeAndAuthorName
        firstName={firstName}
        lastName={lastName}
        role={role}
        data-testid="badge-and-author"
      />
      <p className="text-xs pb-1">{email}</p>
    </div>
  );
}
