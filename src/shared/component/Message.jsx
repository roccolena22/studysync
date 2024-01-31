export default function Message({ text, type }) {
  return (
    <p
      className={`text-lg ${
        type === "error" ? "text-red-600" : "text-gray-600"
      }`}
    >
      {text}
    </p>
  );
}
