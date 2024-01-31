export default function Slogan({ firstPart, highlightedPart, secondPart }) {
  return (
    <div data-testid="slogan" className="text-2xl font-semibold italic text-center text-white pb-20">
      {firstPart}
      <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-cyan-800 relative inline-block text-white">
        <span className="relative text-white">{highlightedPart}</span>
      </span>
      {secondPart}
    </div>
  );
}
