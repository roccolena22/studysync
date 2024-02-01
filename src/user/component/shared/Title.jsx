export default function Title({ title, fontSize = "text-2xl", children }) {
  const titleClasses = `${fontSize} w-full flex justify-between font-semibold items-center border-b border-gray-400 pb-2`;

  return (
    <div className={titleClasses}>
      <p>{title}</p>
      {children}
    </div>
  );
}
