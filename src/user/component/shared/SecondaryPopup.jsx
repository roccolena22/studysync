import React from "react";
import Icon from "../../../shared/component/Icon";
import Title from "./Title";

export default function SecondaryPopup({ children, handleClose, title }) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -trangray-x-1/2 -trangray-y-1/2 w-fit h-fit flex flex-col justify-center items-center bg-gray-100 z-[100] border border-cyan-700 rounded-lg shadow-xl">
      <div className="w-full">
        <div className="flex justify-end p-2 sticky top-0">
          <Icon
            name="close"
            style="rounded-2xl w-6 h-6 hover:border border-red-800 hover:text-red-800"
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
