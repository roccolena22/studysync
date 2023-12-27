import { Outlet } from "react-router-dom";

export default function GuestTemplate() {
  return (
    <div className="bg-gradient-to-b from-cyan-700 to-slate-400 text-slate-700">
      <Outlet />
    </div>
  );
}
