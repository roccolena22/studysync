export default function ExternalLink({ link }) {
  return (
    <a
      href={link}
      className="text-xs md:text-md text-cyan-700 cursor-pointer underline"
    >
      {link.length > 12 ? link.slice(0, 12) + "..." : link}
    </a>
  );
}
