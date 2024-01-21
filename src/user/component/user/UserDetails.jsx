import BadgeAndAuthorName from "../card/BadgeAndAuthorName";

export default function UserDetails({ firstName, lastName, role, email }) {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="flex flex-col items-start">
     <BadgeAndAuthorName fullName={fullName} role={role}/>
      <p className="text-xs pb-1">{email}</p>
    </div>
  );
}
