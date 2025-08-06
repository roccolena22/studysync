import React from "react";
import Badge from "../shared/Badge";

interface BadgeAndAuthorNameProps {
  firstName: string;
  lastName: string;
  role?: string;
}

export default function BadgeAndAuthorName({
  firstName,
  lastName,
  role,
}: BadgeAndAuthorNameProps): JSX.Element {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="flex space-x-1 items-center">
      {role && <Badge text={role.slice(0, 1)} />}
      <p>{fullName}</p>
    </div>
  );
}
