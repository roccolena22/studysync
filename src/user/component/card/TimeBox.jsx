export default function TimeBox({ date, time, type, status }) {
  let key =
    type === "end"
      ? "border-t border-r border-l border-red-800 rounded-t-lg bottom-0"
      : "border-b border-r border-l border-green-700 rounded-b-lg top-0";

  let labelText = type === "end" ? "End:" : "Start:";

  return (
    <div
      className={`text-xs p-1 sm:p-2 absolute left-1/2 transform -translate-x-1/2 space-x-1 ${key} ${
        status === "Finished" ? " bg-red-100" : " bg-white"
      }`}
    >
      <span className="font-semibold">{labelText}</span>
      <span>{date}</span>
      <span>{time}</span>
    </div>
  );
}
