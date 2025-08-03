interface LegendProps {
  colorOne: string;
  colorTwo: string;
  textOne: string;
  textTwo: string;
}

export default function Legend({
  colorOne,
  colorTwo,
  textOne,
  textTwo,
}: LegendProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <div
          data-testid="color-one"
          className={`w-4 h-4 rounded-2xl mr-2 ${colorOne}`}
        ></div>
        <span className="text-sm md:text-lg">{textOne}</span>
      </div>
      <div className="flex items-center">
        <div
          data-testid="color-two"
          className={`w-4 h-4 rounded-2xl mr-2 ${colorTwo}`}
        ></div>
        <span className="text-sm md:text-lg">{textTwo}</span>
      </div>
    </div>
  );
}
