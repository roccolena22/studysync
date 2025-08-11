import { DefaultColor } from "../models";

interface AppNameProps {
  name: string;
  isWhite?: boolean;
}

export default function AppName({ isWhite, name }: AppNameProps): JSX.Element {
  return (
    <div className="py-4 font-semibold">
     <p
  className={`text-[28px] ${
    isWhite ? `${DefaultColor.TEXT_SECONDARY_COLOR}` : `${DefaultColor.TEXT_PRIMARY_COLOR}`
  } font-extrabold`}
  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
>
  {name}
</p>

    </div>
  );
}
