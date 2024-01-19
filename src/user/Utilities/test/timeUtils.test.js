import { sortEvents } from "../timeutils";

test('sortEvents should sort events array based on endDate and endTime', () => {
  const unsortedEvents = [
    {
      endDate: '2024-01-30',
      endTime: '12:00',
    },
    {
      endDate: '2024-01-25',
      endTime: '14:30',
    },
    {
      endDate: '2024-02-01',
      endTime: '10:00',
    },
  ];

  const sortedEvents = sortEvents(unsortedEvents);

  expect(sortedEvents).toEqual([
    {
      endDate: '2024-01-25',
      endTime: '14:30',
    },
    {
      endDate: '2024-01-30',
      endTime: '12:00',
    },
    {
      endDate: '2024-02-01',
      endTime: '10:00',
    },
  ]);
});

test('sortEvents should handle empty events array', () => {
  const emptyEvents = [];
  const result = sortEvents(emptyEvents);

  expect(result).toEqual([]);
});

test('sortEvents should handle null or undefined events array', () => {
  const resultNull = sortEvents(null);
  const resultUndefined = sortEvents(undefined);

  expect(resultNull).toBeNull();
  expect(resultUndefined).toBeUndefined();
});
