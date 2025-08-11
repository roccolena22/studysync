import React, { ReactNode } from "react";
import { DefaultColor } from "../../shared/models";

interface GadgetProps {
  title: string;
  value?: string | number;
  children?: ReactNode;
}

export default function Gadget({ title, value, children }: GadgetProps) {
  return (
    <div
      className={`w-full ${DefaultColor.BG_SECONDARY_COLOR} p-3 rounded-lg shadow-xl flex sm:flex-col justify-between items-center space-x-1`}
    >
      <span className="text-slate-600 sm:text-lg font-semibold">{title}</span>
      <span>{value}</span>
      {children}
    </div>
  );
}
