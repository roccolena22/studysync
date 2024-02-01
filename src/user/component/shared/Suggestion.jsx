import Icon from "../../../shared/component/Icon";

export default function Suggestion({ text }) {
  return (
    <div className="flex items-start space-x-1 w-full py-4 text-xs">
      <Icon name="light" style="text-yellow-400" />
      <span>{text}</span>
    </div>
  );
}
