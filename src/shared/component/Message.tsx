import { DefaultColor, MessageTypes } from "../models";
import Icon from "./Icon";

interface MessageProps {
  text: string;
  type?: MessageTypes;
  iconName?: string;
  iconStyle?: string;
}

export default function Message({
  text,
  type = MessageTypes.DEFAULT,
  iconName,
  iconStyle,
}: MessageProps): JSX.Element {
  let className = "text-sm ";

  switch (type) {
    case "error":
      className += "text-red-600";
      break;
    case "highlighted":
      className += `${DefaultColor.TEXT_PRIMARY_COLOR}`;
      break;
    default:
      className += "text-slate-600";
  }

  return (
    <div className="w-full flex justify-center items-center space-x-1 pt-6">
      {iconName && <Icon name={iconName} style={iconStyle} />}
      <p className={className}>{text}</p>
    </div>
  );
}
