export default function Title({ title, children }) {
  return (
    <div className="w-full text-2xl flex justify-between border-b border-zinc-400 pb-2">
      <p>{title}</p>
      {children}
    </div>
  );
}
