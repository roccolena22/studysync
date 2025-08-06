import React from "react";
import AppName from "../../shared/component/AppName";
import commonTranslations from "../../shared/translations/commonTranslations";
import ErrorContent from "../component/ErrorContent";

export default function ErrorPage(): JSX.Element {
  return (
    <>
      <div className="pl-2">
        <AppName name={commonTranslations.appName} />
      </div>
      <div className="flex items-center justify-center h-screen">
        <ErrorContent />
      </div>
    </>
  );
}
