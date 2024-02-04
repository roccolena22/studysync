import Badge from "../shared/Badge";

export default function BadgeAndAuthorName({ firstName, lastName, role }) {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div data-testid="badge-and-author" className="flex space-x-1 items-center">
      {role && <Badge text={role.slice(0, 1)} />}
      <p>{fullName}</p>
    </div>
  );
}
