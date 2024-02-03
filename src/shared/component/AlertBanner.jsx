import { useState, useEffect } from "react";

export default function AlertBanner({ text, type }) {
  const [isVisible, setIsVisible] = useState(true);
  const duration = 3000;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [duration]);

  const alertTypes = {
    success: "border-green-600 bg-green-100",
    alert: "border-yellow-600 bg-yellow-100",
    delete: "border-red-800 bg-red-200",
  };

  return isVisible ? (
    <div className="fixed top-14 left-1/2 transform -translate-x-1/2 z-[120]">
      <div
        className={`bg-white border-2 rounded-lg px-4 py-3 w-72 text-gray-600 overflow-y-auto ${
          type ? alertTypes[type] : "border-gray-600 bg-gray-100"
        }`}
      >
        <p className="text-center">{text ? text : console.error("text is missing!")}</p>
      </div>
    </div>
  ) : null;
}
