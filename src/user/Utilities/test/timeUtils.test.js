import { sortEventsByTime } from "../timeutils";

describe("sortEventsByTime", () => {
  test("ordina correttamente gli eventi per tempo", () => {
    const eventsArray = [
      { endDate: "2024-01-28", endTime: "10:00" },
      { endDate: "2024-01-28", endTime: "09:00" },
      { endDate: "2024-01-28", endTime: "12:30" },
    ];

    const sortedEvents = sortEventsByTime(eventsArray);

    expect(sortedEvents).toEqual([
      { endDate: "2024-01-28", endTime: "09:00" },
      { endDate: "2024-01-28", endTime: "10:00" },
      { endDate: "2024-01-28", endTime: "12:30" },
    ]);
  });

  test("gestisce correttamente un array vuoto", () => {
    const eventsArray = [];
    const sortedEvents = sortEventsByTime(eventsArray);

    expect(sortedEvents).toEqual([]);
  });

  test("gestisce correttamente un array con un solo evento", () => {
    const eventsArray = [{ endDate: "2024-01-28", endTime: "15:00" }];
    const sortedEvents = sortEventsByTime(eventsArray);

    expect(sortedEvents).toEqual([{ endDate: "2024-01-28", endTime: "15:00" }]);
  });
});
