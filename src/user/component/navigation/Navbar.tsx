import React from "react";
import { Link } from "react-router-dom";
import TopNavigationMenu from "./TopNavigationMenu";
import AppName from "../../../shared/component/AppName";
import commonTranslations from "../../../shared/translations/commonTranslations";
import { DefaultColor } from "../../../shared/models";

export default function Navbar(): JSX.Element {
  return (
    <div
  className={`w-full h-20 flex justify-between items-center space-x-4 px-4 mb-8 border-b border-cyan-800 bg-${DefaultColor.PRIMARY_COLOR}`}
>
      <Link to="/studysync/">
        <AppName isWhite name={commonTranslations.appName} />
      </Link>
      <TopNavigationMenu />
    </div>
  );
}
