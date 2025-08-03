import React, { MouseEventHandler, ButtonHTMLAttributes } from "react";

interface ButtonProps {
  name: string;
  outline?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  small?: boolean;
  disabled?: boolean;
}

export default function Button({
  name,
  outline = false,
  onClick,
  type = "button",
  small = false,
  disabled
}: ButtonProps): JSX.Element {
  const buttonStyle = outline
    ? "text-cyan-700 hover:border-cyan-800 hover:text-white border border-cyan-700"
    : "text-white bg-cyan-700";

  const buttonSize = small ? "w-20" : "w-32";

  return (
    <button
      className={`py-1 rounded-lg flex justify-center hover:bg-cyan-800 transition duration-300 ease-in-out
      ${buttonSize} ${buttonStyle}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <p className="text-sm">{name}</p>
    </button>
  );
}
