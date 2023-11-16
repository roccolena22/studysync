export default function Button({
  name,
  outline = false,
  onClick,
  type,
  children,
  small = false,
}) {
  const buttonStyle = outline
    ? "border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white"
    : "bg-rose-500 text-white hover:bg-rose-600";
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
