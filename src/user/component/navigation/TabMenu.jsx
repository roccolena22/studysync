import { useState } from "react";

export default function TabMenu({
  firstSectionName,
  secondSectionName,
  handleSections,
  indexClicked,
}) {
  const [index, setIndex] = useState(indexClicked ? indexClicked : 0);
  const handleIndex = (index) => {
    setIndex(index);
    handleSections(index);
  };
  const sectionClass = (sectionIndex) =>
    `w-1/2 cursor-pointer hover:text-cyan-700 ${
      index === sectionIndex ? "p-2 bg-white" : "p-2 bg-gray-50"
    }`;

  return (
    <div className="w-full bg-gray-50 rounded-t-lg">
      <div className="flex font-semibold text-xs md:text-sm lg:text-lg px-2 px-2 sm:px-0">
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
