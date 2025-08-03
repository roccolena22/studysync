import { useState } from "react";

interface TabMenuProps {
  firstSectionName: string;
  secondSectionName: string;
  handleSections: (index: number) => void;
  indexClicked?: number;
}

export default function TabMenu({
  firstSectionName,
  secondSectionName,
  handleSections,
  indexClicked,
}: TabMenuProps): JSX.Element {
  const [index, setIndex] = useState < number > (indexClicked ?? 0);

  const handleIndex = (i: number) => {
    setIndex(i);
    handleSections(i);
  };

  const sectionClass = (sectionIndex: number): string =>
    `w-1/2 cursor-pointer hover:text-cyan-700 py-4 sm:py-2 px-2 ${
      index === sectionIndex ? "bg-white" : "bg-gray-50"
    }`;

  return (
    <div className="w-full bg-gray-50 rounded-t-lg">
      <div className="flex font-semibold text-sm md:text-md lg:text-lg sm:px-0">
        <div onClick={() => handleIndex(0)} className={sectionClass(0)}>
          <p>{firstSectionName}</p>
        </div>
        <div onClick={() => handleIndex(1)} className={sectionClass(1)}>
          <p className="text-end">{secondSectionName}</p>
        </div>
      </div>
    </div>
  );
}
