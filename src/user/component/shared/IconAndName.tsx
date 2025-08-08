import { Link, useLocation } from "react-router-dom";
import Icon from "../../../shared/component/Icon";

interface IconAndNameProps {
  iconName: string;
  label: string;
  onClick?: () => void;
  color?: keyof typeof COLORS;
  pathname?: string;
}

const COLORS = {
  cyan: "text-cyan-700",
  white: "text-white",
  red: "text-red-800",
};

export default function IconAndName({
  iconName,
  label,
  onClick,
  color = "cyan",
  pathname,
}: IconAndNameProps): JSX.Element {
  const location = useLocation();
  const colorClass = COLORS[color] || COLORS.cyan; // Fallback sicuro
  const commonContainerClasses = "flex flex-col cursor-pointer items-center";
  const isActive = pathname && location.pathname === pathname;

  return pathname ? (
    <div onClick={onClick}>
      <Link
        to={pathname}
        className={`${commonContainerClasses} transition delay-150 duration-300 ease-in-out`}
      >
        <div
          className={`rounded-2xl w-8 h-8 flex items-center justify-center hover:border border-full border-white ${
            isActive ? "bg-gray-400" : ""
          }`}
        >
          <Icon name={iconName} style={`w-4 h-4 ${colorClass}`} />
        </div>
        <p className={`text-[13px] ${colorClass}`}>{label.toUpperCase()}</p>
      </Link>
    </div>
  ) : (
    <div className={commonContainerClasses} onClick={onClick}>
      <Icon name={iconName} style={`w-4 h-4 ${colorClass}`} />
      <p className={`text-[13px] ${colorClass}`}>{label.toUpperCase()}</p>
    </div>
  );
}
