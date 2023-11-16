export default function GadgetBox({ children }) {
  return (
    <div className="bg-white w-full p-4 rounded-lg shadow-lg flex justify-center items-center">
      {children}
    </div>
  );
}
