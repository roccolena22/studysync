import React from "react";

interface ExternalLinkProps {
  link: string;
}

export default function ExternalLink({ link }: ExternalLinkProps): JSX.Element {
  return (
    <a
      href={link}
      className="text-xs md:text-md text-cyan-700 cursor-pointer underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {link.length > 12 ? link.slice(0, 12) + "..." : link}
    </a>
  );
}
