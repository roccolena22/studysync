import { useState } from "react";

export default function TabMenu({
  firstSectionName,
  secondSectionName,
  handleSections,
}) {
  const [index, setIndex] = useState(0);

  const handleIndex = (index) => {
    setIndex(index);
    handleSections(index);
  };

  const sectionClass = (sectionIndex) =>
    `w-1/2 cursor-pointer ${
      index === sectionIndex
        ? "border-b-4 border-cyan-700 pb-2"
        : "border-b-2 border-slate-400 pb-2"
    }`;

  return (
    <div className="w-full">
      <div className="flex">
        <div onClick={() => handleIndex(0)} className={sectionClass(0)}>
          <p className="text-cyan-700 md:text-sm lg:text-lg border-l sm:border-none px-2 sm:px-0">
            {firstSectionName}
          </p>
        </div>
        <div onClick={() => handleIndex(1)} className={sectionClass(1)}>
          <p className="text-cyan-700 md:text-sm lg:text-lg text-end border-x sm:border-none px-2 sm:px-0">
            {secondSectionName}
          </p>
        </div>
      </div>     
    </div>
  );
}
