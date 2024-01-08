export default function Button({
  name,
  outline = false,
  onClick,
  type,
  children,
  small = false,
}) {
  const buttonStyle = outline
    ? "border border-cyan-700 hover:border-cyan-800 text-cyan-700 hover:bg-cyan-800 hover:text-white transition duration-300 ease-in-out"
    : "bg-cyan-700 text-white hover:bg-cyan-800 transition duration-300 ease-in-out";

  const buttonSize = small ? "w-20 px-1" : "w-32 py-1";

  return (
    <button
      className={`rounded-lg flex justify-center items-center ${buttonSize} ${buttonStyle}`}
      onClick={onClick}
      type={type}
    >
      <p className={`${small ? "text-sm" : "text-md"}`}>{name}</p>
      {children}
    </button>
  );
}
