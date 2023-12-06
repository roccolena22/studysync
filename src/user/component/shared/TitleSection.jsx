export default function TitleSection({ title, children }) {
    return (
      <div className="w-full text-lg text-sky-700 flex justify-between border-b-2 border-sky-700 pb-2">{title}{children}</div>
    );
  }
  