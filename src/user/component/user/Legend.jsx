export default function Legend({ colorOne, colorTwo, textOne, textTwo }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <div className={`w-4 h-4 rounded-2xl mr-2 ${colorOne}`}></div>
        <span className="text-sm">{textOne}</span>
      </div>
      <div className="flex items-center">
        <div className={`w-4 h-4 rounded-2xl mr-2 ${colorTwo}`}></div>
        <span className="text-sm">{textTwo}</span>
      </div>
    </div>
  );
}