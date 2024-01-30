import React from "react";

export default function Button({
  name,
  outline = false,
  onClick,
  type,
  children,
  small = false,
}) {
  const buttonStyle = outline
    ? "border border-cyan-700 text-cyan-700 hover:border-cyan-800 hover:text-white"
    : "bg-cyan-700 text-white";

  const buttonSize = small ? "w-20 px-1" : "w-32 py-1";

  return (
    <button
      className={`rounded-lg flex justify-center items-center hover:bg-cyan-800 transition duration-300 ease-in-out
 ${buttonSize} ${buttonStyle}`}
      onClick={onClick}
      type={type}
    >
      <p className={`${small ? "text-sm" : "text-md"}`}>{name}</p>
      {children}
    </button>
  );
}
