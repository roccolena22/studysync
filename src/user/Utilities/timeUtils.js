export const sortEventsForTime = (eventsArray) => {
  return eventsArray && [...eventsArray].sort((a, b) => {
    const dateA = new Date(`${a.endDate} ${a.endTime}`);
    const dateB = new Date(`${b.endDate} ${b.endTime}`);
    return dateA - dateB;
  });
};
