export default function Title({ title, fontSize = "text-2xl", children }) {
  return (
    <div
      className={`w-full ${fontSize} flex justify-between font-semibold items-center border-b border-gray-400 pb-2`}
    >
      <p>{title}</p>
      {children}
    </div>
  );
}
