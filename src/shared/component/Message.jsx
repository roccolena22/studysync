import Icon from "./Icon";

export default function Message({ text, type, iconName, iconStyle }) {
  let className = "text-sm ";

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

  return (
    <div className="w-full flex items-center space-x-1 pt-6">
      {iconName && (
        <Icon data-testid="icon" name={iconName} style={iconStyle} />
      )}
      <p className={className}>{text}</p>
    </div>
  );
}
