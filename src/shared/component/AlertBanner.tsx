import { useState, useEffect } from "react";
import { AlertTypes, DefaultColor } from "../../shared/models";

interface AlertBannerProps {
  text: string;
  type?: AlertTypes;
}

export default function AlertBanner({
  text,
  type,
}: AlertBannerProps): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(true);
  const duration = 3000;

  useEffect(() => {
    if (!text) {
      console.error("text is missing!");
    }

    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [duration, text]);

  const alertTypes: Record<AlertTypes, string> = {
    [AlertTypes.SUCCESS]: "border-green-600 bg-green-100",
    [AlertTypes.ALERT]: "border-yellow-600 bg-yellow-100",
    [AlertTypes.ERROR]: "border-red-800 bg-red-200",
  };

  const alertClass =
    type && alertTypes[type] ? alertTypes[type] : "border-gray-600 bg-gray-100";

  return isVisible ? (
    <div className="fixed top-14 left-1/2 transform -translate-x-1/2 z-[120]">
      <div
        className={`bg-${DefaultColor.SECONDARY_COLOR} border-2 rounded-lg px-4 py-3 w-72 text-gray-600 overflow-y-auto ${alertClass}`}
      >
        <p className="text-center">{text}</p>
      </div>
    </div>
  ) : null;
}
