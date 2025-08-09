import { ReactNode } from "react";

interface TitleProps {
  title: string;
  fontSize?: string;
  children?: ReactNode;
}

export default function Title({
  title,
  fontSize = "text-2xl",
  children,
}: TitleProps): JSX.Element {
  const titleClasses = `${fontSize} w-full flex justify-between font-semibold items-center border-b border-slate-400 pb-2`;

  return (
    <div className={titleClasses}>
      <p>{title}</p>
      {children}
    </div>
  );
}
