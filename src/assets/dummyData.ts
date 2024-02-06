import { Relation } from "../types";

export const relationData: Relation[] = [
  {
    startStation: "Hamburg",
    endStation: "Berlin",
    timeWindows: [
      {
        startDate: new Date("2022-01-01"),
        endDate: new Date("2022-01-31"),
      },
    ],
  },
  {
    startStation: "Berlin",
    endStation: "Hamburg",
    timeWindows: [
      {
        startDate: new Date("2022-01-01"),
        endDate: new Date("2022-01-31"),
      },
      {
        startDate: new Date("2022-03-03"),
        endDate: new Date("2022-03-10"),
      },
    ],
  },
];
