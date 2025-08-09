import React, { ReactNode } from "react";
import Icon from "../../../shared/component/Icon";
import Title from "./Title";
import { DefaultColor } from "../../../shared/models";

interface SecondaryPopupProps {
  children: ReactNode;
  handleClose: () => void;
  title?: string;
}

export default function SecondaryPopup({
  children,
  handleClose,
  title,
}: SecondaryPopupProps): JSX.Element {
  return (
    <div
  className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit flex flex-col justify-center items-center z-[100] rounded-lg shadow-xl border ${DefaultColor.BORDER_PRIMARY_COLOR}`}
>

      <div className="w-full">
        <div className="flex justify-end p-2 sticky top-0">
          <Icon
            name="close"
            style="rounded-2xl w-6 h-6 hover:border border-red-800 hover:brightness-110"
            onClick={handleClose}
          />
        </div>
        <div className="sticky top-8">
          {title && <Title title={title} fontSize="text-lg" />}
        </div>
        <div className="pb-6 px-6">{children}</div>
      </div>
    </div>
  );
}
