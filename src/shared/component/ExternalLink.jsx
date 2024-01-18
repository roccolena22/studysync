export default function ExternalLink({ link, paste = "false" }) {
  return (
    <a
      href={link}
      className="text-xs md:text-md text-cyan-700 cursor-pointer underline"
    >
      {paste && link.length > 12
        ? link.slice(0, 12) + "..."
        : link}
    </a>
  );
}
