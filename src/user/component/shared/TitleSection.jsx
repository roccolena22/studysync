export default function TitleSection({ title, children }) {
    return (
      <div className="w-full text-lg text-rose-500 flex justify-between border-b-2 border-cyan-700 pb-2">{title}{children}</div>
    );
  }
  