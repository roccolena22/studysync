export default function Legend() {
    return (
      <div className="flex items-center space-x-4 pt-4">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-2xl bg-green-500 mr-2"></div>
          <span className="text-sm">Your events</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-2xl bg-sky-500 mr-2"></div>
          <span className="text-sm">Events you attend</span>
        </div>
      </div>
    );
  }