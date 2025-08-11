import { EventModel } from "../models";

export const sortEventsByTime = (
  eventsArray?: EventModel[]
): EventModel[] | undefined => {
  if (!eventsArray) return undefined;

  return [...eventsArray].sort((a, b) => {
    const dateA = new Date(`${a.endDate}`).getTime();
    const dateB = new Date(`${b.endDate}`).getTime();
    return dateA - dateB;
  });
};
