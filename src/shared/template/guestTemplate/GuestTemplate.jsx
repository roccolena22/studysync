import { Outlet } from "react-router-dom";

export default function GuestTemplate() {
  return (
    <div className="bg-gradient-to-b from-rose-500 to-sky-700">
      <Outlet />
    </div>
  );
}
