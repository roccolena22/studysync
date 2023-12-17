import { BsCcCircle } from "react-icons/bs";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { HiLogout } from "react-icons/hi";
import { MdManageAccounts } from "react-icons/md";
import { AiOutlineMore, AiOutlinePlus } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { LuContact } from "react-icons/lu";
import { AiOutlineAlert } from "react-icons/ai";
import { BiNetworkChart } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { BiClipboard } from "react-icons/bi";
import { TfiSave } from "react-icons/tfi";
import { IoIosClose } from "react-icons/io";
import { FaLightbulb } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

export default function Icon({ name, style, color, onClick }) {
  const colorClass = color ? `text-${color}` : "text-cyan-700";
  const classNames = `${style} ${colorClass}`;
  const iconMapping = {
    logo: <BsCcCircle className={classNames} onClick={onClick} />,
    dashboard: (
      <MdOutlineDashboardCustomize className={classNames} onClick={onClick} />
    ),
    search: <BsSearch className={classNames} onClick={onClick} />,
    logout: <HiLogout className={classNames} onClick={onClick} />,
    account: <MdManageAccounts className={classNames} onClick={onClick} />,
    plus: <AiOutlinePlus className={classNames} onClick={onClick} />,
    calendar: <IoCalendarOutline className={classNames} onClick={onClick} />,
    delete: <RiDeleteBinLine className={classNames} onClick={onClick} />,
    arrowUp: <IoIosArrowUp className={classNames} onClick={onClick} />,
    arrowDown: <IoIosArrowDown className={classNames} onClick={onClick} />,
    contact: <LuContact className={classNames} onClick={onClick} />,
    alert: <AiOutlineAlert className={classNames} onClick={onClick} />,
    network: <BiNetworkChart className={classNames} onClick={onClick} />,
    edit: <MdOutlineEdit className={classNames} onClick={onClick} />,
    board: <BiClipboard className={classNames} onClick={onClick} />,
    save: <TfiSave className={classNames} onClick={onClick} />,
    close: <IoIosClose className={classNames} onClick={onClick} />,
    light: <FaLightbulb className={classNames} onClick={onClick} />,
    more: <AiOutlineMore className={classNames} onClick={onClick} />,
    back: <FaArrowLeft className={classNames} onClick={onClick} />,
    group: <HiUserGroup className={classNames} onClick={onClick} />,
    eye: <AiOutlineEye className={classNames} onClick={onClick} />,
    eyeInvisible: <AiOutlineEyeInvisible className={classNames} onClick={onClick} />,
  };
  return iconMapping[name];
}
