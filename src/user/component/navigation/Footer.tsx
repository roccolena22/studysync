import React from "react";
import IconAndName from "../shared/IconAndName";

export default function Footer(): JSX.Element {
  return (
    <div className="flex items-center w-full bg-cyan-700 h-20 border-t border-cyan-800">
      <div className="flex justify-around w-full">
        <IconAndName
          label="dashboard"
          iconName="dashboard"
          pathname="/studysync/"
        />
        <IconAndName
          label="events"
          iconName="calendar"
          pathname="/studysync/events"
        />
        <IconAndName
          label="network"
          iconName="network"
          pathname="/studysync/network"
        />
      </div>
    </div>
  );
}
