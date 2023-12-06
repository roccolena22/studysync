export default function TitlePage({ title, children }) {
  return (
    <div className="w-full text-2xl text-sky-700 flex justify-between border-b-4 border-sky-700 pb-2">
      <p>{title}</p>
      {children}
    </div>
  );
}
