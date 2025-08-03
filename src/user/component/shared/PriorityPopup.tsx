import React, { ReactNode, useEffect } from "react";
import Icon from "../../../shared/component/Icon";
import Title from "./Title";

interface PriorityPopupProps {
  children: ReactNode;
  handleClose: () => void;
  title?: string;
}

export default function PriorityPopup({
  children,
  handleClose,
  title,
}: PriorityPopupProps): JSX.Element {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      data-testid="priority-popup-bg"
      className="fixed top-0 right-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-20 z-[100]"
    >
      <div
        data-testid="priority-popup-container"
        className="bg-gray-50 rounded-lg px-4 w-5/6 lg:w-2/3 h-5/6 overflow-y-auto pb-4"
      >
        <div className="flex justify-end pt-2 sticky top-0 bg-gray-50">
          <Icon
            data-testid="icon"
            name="close"
            style="rounded-2xl w-6 h-6 hover:border border-red-800 hover:text-red-800 bg-white"
            onClick={handleClose}
          />
        </div>
        <div className="sticky top-8 bg-gray-50">
          {title && <Title title={title} fontSize="text-lg" />}
        </div>
        {children}
      </div>
    </div>
  );
}
