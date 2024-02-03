export default function GuestPageContainer({ children }) {
  return (
    <div
      data-testid="guest-container"
      className="min-h-screen flex justify-center items-center px-4 w-full"
    >
      <div className="bg-white px-8 py-2 rounded-lg shadow-md z-10 w-full sm:w-96">
        {children}
      </div>
    </div>
  );
}
