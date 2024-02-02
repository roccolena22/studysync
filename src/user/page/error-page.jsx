import AppName from "../../shared/component/AppName";
import ErrorContent from "../component/ErrorContent";

export default function ErrorPage() {
  return (
    <>
      <div className="pl-2">
        <AppName name="StudySync" />
      </div>
      <div className="flex items-center justify-center h-screen">
        <ErrorContent />
      </div>
    </>
  );
}
