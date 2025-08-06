import { UseFormRegisterReturn } from "react-hook-form";
import React, { ReactNode, KeyboardEvent } from "react";


interface InputProps {
  label?: string;
  errorMessage?: string;
  type?: string;
  register?: UseFormRegisterReturn;
  children?: ReactNode;
  required?: boolean;
  placeholder?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  errorMessage,
  type = "text",
  register,
  children,
  required = false,
  placeholder = "",
  onKeyDown,
}: InputProps) {
  return (
    <div className="py-2 w-full">
      <div className="flex">
        {label && <label className="font-semibold">{label}:</label>}
        {required && <p className="text-red-500 text-xs">*</p>}
      </div>
      <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 w-full bg-white">
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className="w-full focus:outline-none bg-white"
          onKeyDown={onKeyDown}
        />
        {children}
      </div>
      <p className="text-red-500 mt-1">{errorMessage}</p>
    </div>
  );
}
