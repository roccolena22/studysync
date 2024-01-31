import { Outlet } from "react-router-dom";

export default function GuestTemplate() {
  return (
    <div data-testid="guest-template" className="bg-gradient-to-b from-cyan-700 to-gray-400 text-gray-700 w-full flex justify-center">
      <Outlet />
    </div>
  );
}
