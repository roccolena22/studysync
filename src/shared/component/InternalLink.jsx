import { Link } from "react-router-dom";

export default function InternalLink({ path, text }) {
  return (
    <Link to={path} className="text-xs text-cyan-700 text-center">
      <p className="pb-2">{text}</p>
    </Link>
  );
}
