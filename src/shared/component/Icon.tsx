import React from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { HiLogout } from "react-icons/hi";
import { MdManageAccounts } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiNetworkChart, BiSolidErrorAlt } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";
import { IoIosClose } from "react-icons/io";
import { FaLightbulb, FaArrowLeft } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoMdOpen } from "react-icons/io";
import { CiGrid41 } from "react-icons/ci";

interface IconProps {
  name: string;
  style?: string;
  color?: string;
  onClick?: () => void;
}

export default function Icon({ name, style = "", color, onClick }: IconProps) {
  const colorClass = color ? `text-${color}` : "text-cyan-700";
  const classNames = `${style} ${colorClass}`.trim();

  const iconMapping: Record<string, JSX.Element> = {
    dashboard: (
      <MdOutlineDashboardCustomize className={classNames} onClick={onClick} />
    ),
    menu: (
      <FiMenu
        className={classNames}
        onClick={onClick}
      />
    ),
    search: (
      <BsSearch
        className={classNames}
        onClick={onClick}
      />
    ),
    logout: (
      <HiLogout
        className={classNames}
        onClick={onClick}
      />
    ),
    account: (
      <MdManageAccounts
        className={classNames}
        onClick={onClick}
      />
    ),
    calendar: (
      <IoCalendarOutline
        className={classNames}
        onClick={onClick}
      />
    ),
    delete: (
      <RiDeleteBinLine
        className={classNames}
        onClick={onClick}
      />
    ),
    network: (
      <BiNetworkChart
        className={classNames}
        onClick={onClick}
      />
    ),
    edit: (
      <MdOutlineEdit
        className={classNames}
        onClick={onClick}
      />
    ),
    save: (
      <TfiSave
        className={classNames}
        onClick={onClick}
      />
    ),
    close: (
      <IoIosClose
        className={classNames}
        onClick={onClick}
      />
    ),
    light: (
      <FaLightbulb
        className={classNames}
        onClick={onClick}
      />
    ),
    back: (
      <FaArrowLeft
        className={classNames}
        onClick={onClick}
      />
    ),
    group: (
      <HiUserGroup
        className={classNames}
        onClick={onClick}
      />
    ),
    eye: (
      <AiOutlineEye
        className={classNames}
        onClick={onClick}
      />
    ),
    eyeInvisible: (
      <AiOutlineEyeInvisible
        className={classNames}
        onClick={onClick}
      />
    ),
    open: (
      <IoMdOpen className={classNames} onClick={onClick} />
    ),
    grid: (
      <CiGrid41 className={classNames} onClick={onClick} />
    ),
  };

  if (!iconMapping[name]) {
    console.error(`Icon "${name}" not found in the mapping.`);
    return (
      <BiSolidErrorAlt className="text-red-500" />
    );
  }

  return <div>{iconMapping[name]}</div>;
}
