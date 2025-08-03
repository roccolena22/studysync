import { Link, useLocation } from "react-router-dom";
import Icon from "../../../shared/component/Icon";

interface IconAndNameProps {
  iconName: string;
  label: string;
  onClick?: () => void;
  color?: string;
  pathname?: string;
}

export default function IconAndName({
  iconName,
  label,
  onClick,
  color = "text-cyan-700",
  pathname,
}: IconAndNameProps): JSX.Element {
  const location = useLocation();

  const commonContainerClasses = "flex flex-col cursor-pointer items-center";
  const commonTextClasses = "text-[10px]";
  const textClasses = commonTextClasses + ` ${color}`;

  return pathname ? (
    <div onClick={onClick}>
      <Link
        to={pathname}
        className={`${commonContainerClasses} transition delay-150 duration-300 ease-in-out`}
      >
        <div
          className={`rounded-2xl w-8 h-8 flex items-center justify-center hover:border border-full border-white ${
            location.pathname === pathname ? "bg-gray-400" : ""
          }`}
        >
          <Icon color="white" name={iconName} />
        </div>
        <p className={`text-[13px] text-white`}>{label.toUpperCase()}</p>
      </Link>
    </div>
  ) : (
    <div className={commonContainerClasses} onClick={onClick}>
      <Icon name={iconName} style={`w-3 h-3 ${color}`} />
      <span className={textClasses}>{label.toUpperCase()}</span>
    </div>
  );
}
