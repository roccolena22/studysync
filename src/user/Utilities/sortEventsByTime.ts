import { EventModel } from "../models";

export const sortEventsByTime = (
  eventsArray?: EventModel[]
): EventModel[] | undefined => {
  if (!eventsArray) return undefined;

  return [...eventsArray].sort((a, b) => {
    const dateA = new Date(`${a.endDate} ${a.endTime}`).getTime();
    const dateB = new Date(`${b.endDate} ${b.endTime}`).getTime();
    return dateA - dateB;
  });
};
