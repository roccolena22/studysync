export default function Badge({ text }) {
  const colorMapping = {
    t: "bg-purple-500 rounded-full",
    s: "bg-yellow-400 rounded-full",
    student: "bg-yellow-400",
    teacher: "bg-purple-500",
    soldout: "bg-red-800",
  };

  const style = colorMapping[text] || "bg-zinc-800";

  return (
    <div
      className={`text-[12px] text-white rounded px-1 w-fit rounded-lg ${style}`}
    >
      <p className="font-semibold">{text.toUpperCase()}</p>
    </div>
  );
}
