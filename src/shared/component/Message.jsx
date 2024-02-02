export default function Message({ text, type }) {
  let className = "text-sm w-full text-center ";

  switch (type) {
    case "error":
      className += "text-red-600";
      break;
    case "highlighted":
      className += "text-cyan-700";
      break;
    default:
      className += "text-gray-600";
  }

  return <p className={className}>{text}</p>;
}
