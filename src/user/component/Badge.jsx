export default function Badge({ text }) {

    const colorMapping = {
      Finished: "bg-red-800",
      Active: "bg-blue-500",
      teacher: "bg-purple-300",
      student: "bg-yellow-300",
    };
  
    const backgroundColor = colorMapping[text] || "bg-gray-800";
  
    return (
        <div
          className={`text-[12px] text-white rounded px-1 w-fit h-fit ${backgroundColor}`}
        >
          <p className="font-semibold">{text}</p>
        </div>
    );
  }
  