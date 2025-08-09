import { Outlet } from "react-router-dom";
import {DefaultColor} from "../../shared/models"

export default function GuestTemplate(): JSX.Element {
  return (
    <div
      className={`bg-gradient-to-b from-${DefaultColor.PRIMARY_COLOR} to-gray-400 text-gray-700 w-full flex justify-center`}

    >
      <Outlet />
    </div>
  );
}
