import React, { useState, useEffect } from "react";
import GadgetBox from "../../user/component/shared/GadgetBox";
import Icon from "./Icon";

const AlertNotification = ({ message, type, onClose }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
      onClose && onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose, showAlert]);

  if (!showAlert) {
    return null;
  }

  return (
    <div
      className={`fixed top-14 left-50% z-50 w-56 rounded-lg shadow-lg bg-white ${
        type === "error" ? "text-red-500" : "text-green-700"
      } `}
    >
      <div
        className="absolute top-0 right-0 cursor-pointer"
        onClick={() => onClose()}
      >
        <Icon
          name="close"
          style="rounded-full w-6 h-6 hover:text-rose-500 from-rose-500 text-slate-600"
        />
      </div>
      <p className="p-4 text-center">{message}</p>
    </div>
  );
};

export default AlertNotification;
