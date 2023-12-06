export default function TitlePage({ title, children }) {
  return (
    <div className="w-full text-2xl text-rose-500 flex justify-between border-b-4 border-cyan-700 pb-2">
      <p>{title}</p>
      {children}
    </div>
  );
}
