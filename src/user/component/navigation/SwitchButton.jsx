import { useState } from "react";
import Icon from "../../../shared/component/Icon";

export default function SwitchButton({
  firstItem,
  secondItem,
  handleSwitch,
  indexSwitch,
}) {
  const [index, setIndex] = useState(indexSwitch);

  const handleIndex = (index) => {
    setIndex(index);
    handleSwitch(index);
  };

  const sectionClass = (sectionIndex) => {
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
