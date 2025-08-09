import { Link, useLocation } from "react-router-dom";
import Icon from "../../../shared/component/Icon";
import { DefaultColor } from "../../../shared/models";
import { User } from "../../models";
import { useSelector } from "react-redux";

interface IconAndNameProps {
  iconName: string;
  label: string;
  onClick?: () => void;
  color?: keyof typeof COLORS;
  pathname?: string;
}

const COLORS = {
  defaultColor: `${DefaultColor.TEXT_PRIMARY_COLOR}`,
  white: `${DefaultColor.TEXT_SECONDARY_COLOR}`,
  red: "text-red-800",
};

export default function IconAndName({
  iconName,
  label,
  onClick,
  color = "defaultColor",
  pathname,
}: IconAndNameProps): JSX.Element {

  const loggedUser = useSelector((state: any) => state.auth.user) as User;
  const location = useLocation();
  const colorClass = COLORS[color] || COLORS.defaultColor;
  const commonContainerClasses = "flex flex-col cursor-pointer items-center transition delay-150 duration-300 ease-in-out";
  const iconWrapperClasses = (isActive: boolean) =>
    `rounded-2xl w-8 h-8 flex items-center justify-center hover:border border-full ${DefaultColor.BORDER_SECONDARY_COLOR} ${
      isActive ? "bg-slate-400" : ""
    }`;

const isActive = (() => {
  if (!pathname) return false;

  if (pathname === "/studysync") {
    return location.pathname === pathname;
  }

  return location.pathname === pathname || location.pathname.startsWith(pathname + "/");
})();

  

  const Content = (
    <>
      <div className={iconWrapperClasses(!!isActive)}>
        <Icon name={iconName} style={`w-4 h-4 ${colorClass}`} />
      </div>
      <p className={`text-[13px] ${colorClass}`}>{label.toUpperCase()}</p>
    </>
  );

  return pathname ? (
    <div onClick={onClick}>
      <Link to={
    pathname && pathname.includes("profile") && !pathname.endsWith(loggedUser.id)
      ? `${pathname}/${loggedUser.id}`
      : pathname || "/"
  } className={commonContainerClasses}>
        {Content}
      </Link>
    </div>
  ) : (
    <div className={commonContainerClasses} onClick={onClick}>
      {Content}
    </div>
  );
}
