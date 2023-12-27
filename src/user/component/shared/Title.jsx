export default function Title({ title, fontSize="text-2xl", children }) {
  return (
    <div className={`w-full ${fontSize} flex justify-between items-center border-b border-slate-400 pb-2`}>
      <p>{title}</p>
      {children}
    </div>
  );
}
