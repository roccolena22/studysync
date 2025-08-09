import { Outlet } from "react-router-dom";
import {DefaultColor} from "../../shared/models"

export default function GuestTemplate(): JSX.Element {
  return (
    <div
      className={`bg-gradient-to-b ${DefaultColor.FROM_PRIMARY_COLOR} to-slate-400 text-slate-700 w-full flex justify-center`}

    >
      <Outlet />
    </div>
  );
}
