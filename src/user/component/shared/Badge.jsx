export default function Badge({ text }) {
  const colorMapping = {
    t: "bg-purple-500 rounded-2xl",
    s: "bg-yellow-400 rounded-2xl",
    student: "bg-yellow-400",
    teacher: "bg-purple-500",
    soldout: "bg-red-800",
    underway: "bg-green-600"
  };

  const style = colorMapping[text] || "bg-gray-800";

  return (
    <div
      className={`text-[10px] text-white rounded-lg px-1 rounded-lg ${style} h-3 sm:h-4 flex justify-center items-center w-fit`}
    >
      <p className="font-semibold">{text && text.toUpperCase()}</p>
    </div>
  );
}
