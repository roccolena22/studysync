import React, { ReactNode, useEffect } from "react";
import Icon from "../../../shared/component/Icon";
import Title from "./Title";
import { DefaultColor } from "../../../shared/models";

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
  className="fixed top-0 right-0 w-screen h-screen flex justify-center items-center z-[100] backdrop-blur-xs"
>
      <div
        className="bg-slate-50 rounded-lg px-4 w-5/6 lg:w-2/3 h-5/6 overflow-y-auto pb-4 border border-slate-200"
      >
        <div className="flex justify-end pt-2 sticky top-0 bg-slate-50">
          <Icon
            name="close"
            style={`rounded-2xl w-6 h-6 hover:border border-red-800 hover:brightness-110 ${DefaultColor.BG_SECONDARY_COLOR}`}
            onClick={handleClose}
          />
        </div>
        <div className="sticky top-8 bg-slate-50">
          {title && <Title title={title} fontSize="text-lg" />}
        </div>
        {children}
      </div>
    </div>
  );
}