import { BsCcCircle } from "react-icons/bs";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { HiLogout } from "react-icons/hi";
import { MdManageAccounts } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineAlert } from "react-icons/ai";
import { BiNetworkChart } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";
import { IoIosClose } from "react-icons/io";
import { FaLightbulb } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { IoMdOpen } from "react-icons/io";
import { CiGrid41 } from "react-icons/ci";
import { BiSolidErrorAlt } from "react-icons/bi";

export default function Icon({ name, style, color, onClick }) {
  const colorClass = color ? `text-${color}` : "text-cyan-700";
  const classNames = `${style} ${colorClass}`;
  const iconMapping = {
    dashboard: (
      <MdOutlineDashboardCustomize className={classNames} onClick={onClick} />
    ),
    menu: (
      <FiMenu
        data-testid="icon-menu"
        className={classNames}
        onClick={onClick}
      />
    ),
    search: (
      <BsSearch
        data-testid="icon-search"
        className={classNames}
        onClick={onClick}
      />
    ),
    logout: (
      <HiLogout
        data-testid="icon-logout"
        className={classNames}
        onClick={onClick}
      />
    ),
    account: (
      <MdManageAccounts
        data-testid="icon-account"
        className={classNames}
        onClick={onClick}
      />
    ),
    calendar: (
      <IoCalendarOutline
        data-testid="icon-calendar"
        className={classNames}
        onClick={onClick}
      />
    ),
    delete: (
      <RiDeleteBinLine
        data-testid="icon-delete"
        className={classNames}
        onClick={onClick}
      />
    ),
    network: (
      <BiNetworkChart
        data-testid="icon-netwrok"
        className={classNames}
        onClick={onClick}
      />
    ),
    edit: (
      <MdOutlineEdit
        data-testid="icon-edit"
        className={classNames}
        onClick={onClick}
      />
    ),
    save: (
      <TfiSave
        data-testid="icon-save"
        className={classNames}
        onClick={onClick}
      />
    ),
    close: (
      <IoIosClose
        data-testid="icon-close"
        className={classNames}
        onClick={onClick}
      />
    ),
    light: (
      <FaLightbulb
        data-testid="icon-light"
        className={classNames}
        onClick={onClick}
      />
    ),
    back: (
      <FaArrowLeft
        data-testid="icon-back"
        className={classNames}
        onClick={onClick}
      />
    ),
    group: (
      <HiUserGroup
        data-testid="icon-group"
        className={classNames}
        onClick={onClick}
      />
    ),
    eye: (
      <AiOutlineEye
        data-testid="icon-eye"
        className={classNames}
        onClick={onClick}
      />
    ),
    eyeInvisible: (
      <AiOutlineEyeInvisible
        data-testid="icon-eyeInvisible"
        className={classNames}
        onClick={onClick}
      />
    ),
    open: (
      <IoMdOpen data-testid="open" className={classNames} onClick={onClick} />
    ),
    grid: (
      <CiGrid41 data-testid="grid" className={classNames} onClick={onClick} />
    ),
  };

  if (!iconMapping[name]) {
    console.error(`Icon "${name}" not found in the mapping.`);
    return (
      <BiSolidErrorAlt data-testid="icon-error" className="text-red-500" />
    );
  }

  return <div data-testid="icon">{iconMapping[name]}</div>;
}
