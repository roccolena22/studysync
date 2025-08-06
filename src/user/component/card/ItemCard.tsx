import React from "react";
import ExternalLink from "../../../shared/component/ExternalLink";

interface ItemCardProps {
  label: string;
  text?: string;
  link?: string;
}

export default function ItemCard({
  label,
  text,
  link,
}: ItemCardProps): JSX.Element {
  return (
    <div>
      <p className="text-gray-700 font-semibold sm:text-md md:text-lg">
        {label}
      </p>
      {text && <span className="text-xs md:text-md">{text}</span>}
      {link && <ExternalLink link={link} />}
    </div>
  );
}
