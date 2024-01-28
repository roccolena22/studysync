import { sortEventsByTime } from "../timeutils";

  test("Correctly orders events by time", () => {
    const eventsArray = [
      { endDate: "2024-01-28", endTime: "09:00" },
      { endDate: "2024-01-28", endTime: "12:30" },
      { endDate: "2024-01-28", endTime: "10:00" },

    ];

    const sortedEvents = sortEventsByTime(eventsArray);

    expect(sortedEvents).toEqual([
      { endDate: "2024-01-28", endTime: "09:00" },
      { endDate: "2024-01-28", endTime: "10:00" },
      { endDate: "2024-01-28", endTime: "12:30" },
    ]);
  });

  test("Handles an empty array correctly", () => {
    const eventsArray = [];
    const sortedEvents = sortEventsByTime(eventsArray);

    expect(sortedEvents).toEqual([]);
  });

  test("Correctly handles an array with a single event", () => {
    const eventsArray = [{ endDate: "2024-01-28", endTime: "15:00" }];
    const sortedEvents = sortEventsByTime(eventsArray);

    expect(sortedEvents).toEqual([{ endDate: "2024-01-28", endTime: "15:00" }]);
  });
