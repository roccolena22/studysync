export default function Badge({ text }) {

    const colorMapping = {
      t: "bg-purple-500",
      s: "bg-yellow-400",
      Soldout: "bg-red-800"
    };
  
    const backgroundColor = colorMapping[text] || "bg-zinc-800";
  
    return (
        <div
          className={`text-[12px] text-white rounded px-1 w-fit ${backgroundColor}`}
        >
          <p className="font-semibold">{text.toUpperCase()}</p>
        </div>
    );
  }
  