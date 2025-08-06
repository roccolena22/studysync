import React from "react";
import BadgeAndAuthorName from "./BadgeAndAuthorName";

interface TitleAndAuthorNameProps {
  firstName: string;
  lastName: string;
  title: string;
  role?: string;
}

export default function TitleAndAuthorName({
  firstName,
  lastName,
  title,
  role,
}: TitleAndAuthorNameProps): JSX.Element {
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
