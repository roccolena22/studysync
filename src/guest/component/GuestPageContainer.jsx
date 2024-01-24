import Slogan from "./Slogan";

export default function FullGuestPageContainer({ children }) {
  return (
    <div className="min-h-screen flex items-center px-4">
      <div className="w-full flex flex-col items-center">
        <div className="hidden sm:block">
          <Slogan
            firstPart="Sync Your Learning with"
            highlightedPart="StudySync"
            secondPart="Build lessons, study sessions, and more together, connecting students and teachers on one smart platform."
          />
        </div>
        <div className="bg-white px-8 py-2 rounded-lg shadow-md w-full z-10 sm:w-3/5 lg:w-2/5">
          {children}
        </div>
      </div>
    </div>
  );
}
