import React from "react";
import { Link } from "react-router-dom";
import TopNavigationMenu from "./TopNavigationMenu";
import AppName from "../../../shared/component/AppName";
import commonTranslations from "../../../shared/translations/commonTranslations";

export default function Navbar(): JSX.Element {
  return (
    <div className="w-full bg-cyan-700 h-20 flex justify-between items-center space-x-4 px-4 mb-8 border-b border-cyan-800">
      <Link to="/studysync/">
        <AppName isWhite name={commonTranslations.appName} />
      </Link>
      <TopNavigationMenu />
    </div>
  );
}
