export default function AppName({ white, name }) {
  return (
    <div className="py-4 font-semibold">
      <p
        className={`text-[28px] ${white ? "text-white" : "text-cyan-700"} font-extrabold`}
        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
      >
        {name}
      </p>
    </div>
  );
}
