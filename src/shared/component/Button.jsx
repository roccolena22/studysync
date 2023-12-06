export default function Button({
  name,
  outline = false,
  onClick,
  type,
  children,
  small = false,
}) {
  const buttonStyle = outline
    ? "border-2 border-cyan-700 text-cyan-700 hover:bg-cyan-700 hover:text-white"
    : "bg-cyan-700 text-white";
  const buttonSize = small ? "w-22 px-1" : "w-32 py-1";

  return (
    <button
      className={`rounded-lg flex justify-center items-center  ${
        buttonSize + " " + buttonStyle
      }`}
      onClick={onClick}
      type={type}
    >
      <span>{name}</span>
      {children}
    </button>
  );
}
