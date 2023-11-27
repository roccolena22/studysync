import { useLocation } from "react-router-dom";
import Icon from "../../../shared/component/Icon";

export default function OptionsCard({ event, handleOpenEditPopup, handleDelete }) {
  const location = useLocation();

  return (
    <div className="flex sm:space-x-1">
      
        <Icon
          name="edit"
          onClick={handleOpenEditPopup}
          style="hidden sm:block w-5 h-5 rounded-full hover:bg-slate-200 cursor-pointer"
        />
      
      <Icon
        name="delete"
        onClick={() => handleDelete(event)}
        style="hidden sm:block w-5 h-5 rounded-full hover-bg-slate-200 cursor-pointer"
      />
      <div className="flex items-center justify-center sm:hidden w-6 h-6 rounded-full hover-bg-slate-200 cursor-pointer">
        <Icon name="more" />
      </div>
    </div>
  );
}
