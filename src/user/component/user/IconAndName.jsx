import Icon from "../../../shared/component/Icon";

export default function IconAndName({
  iconName,
  name,
  onClick,
  color = "text-cyan-700",
}) {
  return (
    <div
      className="flex flex-col cursor-pointer items-center"
      onClick={onClick}
    >
      <Icon name={iconName} style={`w-3 h-3 ${color}`} />
      <span className={`text-[10px] ${color}`}>{name.toUpperCase()}</span>
    </div>
  );
}
