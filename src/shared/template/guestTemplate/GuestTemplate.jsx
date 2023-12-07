import { Outlet } from "react-router-dom";

export default function GuestTemplate() {
  return (
    <div className="bg-gradient-to-b from-cyan-700 to-zinc-400 text-zinc-700">
      <Outlet />
    </div>
  );
}
