import React, { useEffect, useState } from "react";
import moment from "moment";
import ItemCard from "./ItemCard";
import Badge from "../shared/Badge";

export default function BodyCard({ event }) {
  const [isUnderway, setIsUnderway] = useState(false);

  const currentDate = new Date();

  useEffect(() => {
    const end = new Date(`${event.endDate} ${event.endTime}`);
    const start = new Date(`${event.startDate} ${event.startTime}`);
    setIsUnderway(start <= currentDate && currentDate <= end);
  }, [
    currentDate,
    event.endDate,
    event.endTime,
    event.startDate,
    event.startTime,
  ]);

  const startDateToView = moment(
    `${event.startDate} ${event.startTime}`,
    "YYYY-MM-DD HH:mm"
  ).format("DD-MM-YYYY HH:mm");

  const startDate = moment(
    `${event.startDate} ${event.startTime}`,
    "YYYY-MM-DD HH:mm"
  );
  const endDate = moment(
    `${event.endDate} ${event.endTime}`,
    "YYYY-MM-DD HH:mm"
  );
  const duration = moment.duration(endDate.diff(startDate));

  let formattedDuration = "";

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  if (days > 0) {
    formattedDuration += `${days} ${days === 1 ? "day" : "days"}`;
  }

  if (hours > 0) {
    formattedDuration += ` ${hours} h`;
  }

  if (minutes > 0) {
    formattedDuration += ` ${minutes} min`;
  }

  return (
    <div data-testid="body-card" className="w-full">
      <div className="w-full flex flex-col gap-2 sm:flex-row-reverse justify-between sm:items-center pt-2 sm:pt-4 pb-4">
        <div className="space-x-1 items-center flex justify-center">
          {isUnderway && <Badge text="underway" />}
          {event.bookingsRecordId &&
            event.bookingsRecordId.length >= event.places && (
              <Badge text="soldout" />
            )}
        </div>
        <p className="font-bold text-md sm:text-lg">{event.title}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 text-xs sm:text-sm md:text-md">
        <ItemCard
          label="Start"
          text={moment(startDateToView, "DD-MM-YYYY HH:mm").format(
            "DD/MM/YY HH:mm"
          )}
        />
        <ItemCard label="Duration" text={formattedDuration} />
        <ItemCard label="Mode" text={event.mode} />

        {event.location && (
          <ItemCard
            label="Location"
            iconName="location"
            text={event.location}
          />
        )}

        {event.platform && <ItemCard label="Platform" text={event.platform} />}

        {event.platform && event.link && (
          <ItemCard label="Link" link={event.link} />
        )}
        {event.info && <ItemCard label="Info" text={event.info} />}
      </div>
    </div>
  );
}
