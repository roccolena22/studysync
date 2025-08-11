import React from "react";
import IconAndName from "../shared/IconAndName";
import { DefaultColor } from "../../../shared/models";

export default function Footer(): JSX.Element {
  return (
<div
  className={`flex items-center w-full ${DefaultColor.BG_PRIMARY_COLOR} h-20`}
>
      <div className="flex justify-around w-full">
        <IconAndName
          label="dashboard"
          iconName="dashboard"
          pathname="/studysync/"
          color={DefaultColor.SECONDARY_COLOR}
        />
        <IconAndName
          label="events"
          iconName="calendar"
          pathname="/studysync/events"
          color={DefaultColor.SECONDARY_COLOR}
        />
        <IconAndName
          label="network"
          iconName="network"
          pathname="/studysync/network"
          color={DefaultColor.SECONDARY_COLOR}
        />
      </div>
    </div>
  );
}
