import React, { MouseEventHandler } from "react";
import { DefaultColor } from "../models";

interface ButtonProps {
  label: string;
  outline?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  small?: boolean;
  disabled?: boolean;
}

export default function Button({
  label,
  outline = false,
  onClick,
  type = "button",
  small = false,
  disabled
}: ButtonProps): JSX.Element {
const buttonStyle = outline
  ? `${DefaultColor.TEXT_PRIMARY_COLOR} hover:brightness-110 border ${DefaultColor.BORDER_PRIMARY_COLOR}`
  : `${DefaultColor.TEXT_SECONDARY_COLOR} ${DefaultColor.BG_PRIMARY_COLOR}`;


  const buttonSize = small ? "w-20" : "w-32";

  return (
    <button
      className={`py-1 cursor-pointer rounded-lg flex justify-center hover:brightness-110 transition duration-300 ease-in-out
      ${buttonSize} ${buttonStyle}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <p className="text-sm">{label}</p>
    </button>
  );
}
