import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { DefaultColor } from "../../../shared/models";

interface DropdownMenuProps {
  label: string;
  register: UseFormRegisterReturn;
  errorMessage?: string;
  options: string[];
  onOptionSelected: (value: string) => void;
}

const DropdownMenu = ({
  label,
  register,
  errorMessage,
  options,
  onOptionSelected,
}: DropdownMenuProps): JSX.Element => {
  return (
    <div className="py-2 w-full">
      <p className="font-semibold">{label}</p>
<div className={`border border-gray-400 rounded-lg px-3 py-2 w-full bg-${DefaultColor.SECONDARY_COLOR}`}>

        <select
          className="w-full"
          {...register}
          onChange={(e) => {
            onOptionSelected(e.target.value);
          }}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <p className="text-red-500 mt-1">{errorMessage}</p>
    </div>
  );
};

export default DropdownMenu;
