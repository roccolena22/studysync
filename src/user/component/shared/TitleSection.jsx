export default function TitleSection({ title, children }) {
    return (
      <div className="w-full border-b border-green-700 pb-2">{title}{children}</div>
    );
  }
  