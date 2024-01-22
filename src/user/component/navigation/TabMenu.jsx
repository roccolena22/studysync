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
    `w-1/2 cursor-pointer shadow-xl ${
      index === sectionIndex ? "p-2 bg-white" : "p-2 bg-gray-50"
    }`;

  return (
    <div className="w-full bg-gray-50 rounded-t-lg">
      <div className="flex">
        <div onClick={() => handleIndex(0)} className={sectionClass(0)}>
          <p className="text-xs md:text-sm lg:text-lg px-2 sm:px-0">
            {firstSectionName}
          </p>
        </div>
        <div onClick={() => handleIndex(1)} className={sectionClass(1)}>
          <p className="text-xs md:text-sm lg:text-lg text-end px-2 sm:px-0">
            {secondSectionName}
          </p>
        </div>
      </div>
    </div>
  );
}
