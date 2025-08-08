import React from "react";

interface BadgeProps {
  text: string;
}

export default function Badge({ text }: BadgeProps): JSX.Element {
  const colorMapping: Record<string, string> = {
    t: "bg-purple-500 rounded-2xl",
    s: "bg-yellow-400 rounded-2xl",
    student: "bg-yellow-400",
    teacher: "bg-purple-500",
    soldout: "bg-red-800",
    underway: "bg-green-600",
  };

  const bgColor = colorMapping[text] || "bg-gray-800";

  return (
    <>
      {text && (
        <div
          className={`${bgColor} text-[10px] text-white px-1 rounded-lg h-3 sm:h-4 flex justify-center items-center w-fit font-semibold`}
        >
          <p>{String(text).toUpperCase()}</p>
        </div>
      )}
    </>
  );
}
