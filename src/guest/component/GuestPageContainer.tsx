import React, { ReactNode } from "react";
import { DefaultColor } from "../../shared/models";

interface GuestPageContainerProps {
  children: ReactNode;
}

export default function GuestPageContainer({
  children,
}: GuestPageContainerProps): JSX.Element {
  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 w-full"
    >
      <div className={`${DefaultColor.BG_SECONDARY_COLOR} px-8 py-2 rounded-lg shadow-md z-10 w-full sm:w-96`}>
        {children}
      </div>
    </div>
  );
}
