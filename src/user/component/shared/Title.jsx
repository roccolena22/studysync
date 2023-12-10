export default function Title({ title, fontSize="text-2xl", children }) {
  return (
    <div className={`w-full ${fontSize} flex justify-between border-b border-zinc-400 pb-2`}>
      <p>{title}</p>
      {children}
    </div>
  );
}
