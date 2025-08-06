import { useState, useEffect } from "react";
import Icon from "../../../shared/component/Icon";

interface SwitchButtonProps {
  firstItem: string;
  secondItem: string;
  handleSwitch: (index: number) => void;
  indexSwitch: number;
}

export default function SwitchButton({
  firstItem,
  secondItem,
  handleSwitch,
  indexSwitch,
}: SwitchButtonProps): JSX.Element {
const [index, setIndex] = useState<number>(indexSwitch);


  useEffect(() => {
    setIndex(indexSwitch);
  }, [indexSwitch]);

  const handleIndex = (newIndex: number) => {
    setIndex(newIndex);
    handleSwitch(newIndex);
  };

  const sectionClass = (sectionIndex: number): string => {
    return `w-1/2 cursor-pointer ${
      index === sectionIndex ? "bg-white shadow-xl" : "bg-gray-50"
    } flex justify-center rounded-full py-1`;
  };

  return (
    <div className="w-24 rounded-full">
      <div className="flex rounded-full">
        <div onClick={() => handleIndex(0)} className={sectionClass(0)}>
          <Icon name={firstItem} style="h-5 w-5" />
        </div>
        <div onClick={() => handleIndex(1)} className={sectionClass(1)}>
          <Icon name={secondItem} style="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
