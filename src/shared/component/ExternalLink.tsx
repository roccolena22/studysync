import React from "react";
import { DefaultColor } from "../models";

interface ExternalLinkProps {
  link: string;
}

export default function ExternalLink({ link }: ExternalLinkProps): JSX.Element {
  return (
    <a
      href={link}
      className={`text-xs md:text-md text-${DefaultColor.PRIMARY_COLOR} cursor-pointer underline`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {link.length > 12 ? link.slice(0, 12) + "..." : link}
    </a>
  );
}
