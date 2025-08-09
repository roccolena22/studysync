import React from "react";
import { DefaultColor } from "../models";

interface LoaderProps {
  size?: string;
  color?: string;
  text?: string;
}

export default function Loader({
  size = "h-8 w-8",
  color = `text-${DefaultColor.PRIMARY_COLOR}`,
  text,
}: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <svg
        className={`animate-spin ${size} ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      {text && <span className="text-gray-600 text-sm">{text}</span>}
    </div>
  );
}
