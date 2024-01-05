export default function FullPageContainer({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white px-8 py-2 rounded-lg shadow-md w-full sm:w-3/5 lg:w-2/5 z-10">
        {children}
      </div>
    </div>
  );
}