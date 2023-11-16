export default function TitlePage({ title, children }) {
  return (
    <div className="w-full text-lg font-semibold flex justify-between border-b-2 border-green-700 pb-2">
      {title}
      {children}
    </div>
  );
}
