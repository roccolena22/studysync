import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../../shared/component/Icon";

export default function IconAndName({
  iconName,
  label,
  onClick,
  color = "text-cyan-700",
  pathname,
  isLink = false,
}) {
  const location = useLocation();

  const commonContainerClasses = "flex flex-col cursor-pointer items-center";
  const commonTextClasses = "text-[10px]";
  const textClasses = commonTextClasses + ` ${color}`;

  return isLink ? (
    <div onClick={onClick}>
      <Link
        to={pathname}
        className={`${commonContainerClasses} transition delay-150 duration-300 ease-in-out`}
      >
        <Icon
          color="white"
          name={iconName}
          style={`rounded-full w-8 h-8 p-2 hover:border border-full border-white ${
            location.pathname === pathname ? "bg-zinc-400" : ""
          }`}
        />
        <p className="text-[13px] text-white">{label.toUpperCase()}</p>
      </Link>
    </div>
  ) : (
    <div className={commonContainerClasses} onClick={onClick}>
      <Icon name={iconName} style={`w-3 h-3 ${color}`} />
      <span className={textClasses}>{label.toUpperCase()}</span>
    </div>
  );
}
