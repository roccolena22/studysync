interface Event {
  endDate: string;
  endTime: string;
}

export const sortEventsByTime = (
  eventsArray?: Event[]
): Event[] | undefined => {
  if (!eventsArray) return undefined;

  return [...eventsArray].sort((a, b) => {
    const dateA = new Date(`${a.endDate} ${a.endTime}`).getTime();
    const dateB = new Date(`${b.endDate} ${b.endTime}`).getTime();
    return dateA - dateB;
  });
};
