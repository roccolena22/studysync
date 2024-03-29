import BadgeAndAuthorName from "./BadgeAndAuthorName";

export default function TitleAndAuthorName({
  firstName,
  lastName,
  title,
  role,
}) {
  return (
    <div className="flex justify-between w-full px-6">
      <span className="font-semibold">- {title}</span>
      <BadgeAndAuthorName
        firstName={firstName}
        lastName={lastName}
        role={role}
      />
    </div>
  );
}
