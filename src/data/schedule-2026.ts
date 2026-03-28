export interface ScheduleDay {
  title: string;
  description: string;
  date: string;
  icon: string;
}

export const schedule: ScheduleDay[] = [
  {
    title: "Thursday (Arrival Day)",
    description: "Travel, check-in, and get settled.",
    date: "2026-06-11",
    icon: "la:plane-arrival",
  },
  {
    title: "Friday (Opening Rounds)",
    description: "Qualchan (8:15, 8:24, 8:33). Indian Canyon (2:18, 2:27, 2:36)",
    date: "2026-06-12",
    icon: "maki:golf",
  },
  {
    title: "Saturday (One Round)",
    description: "Circling Raven (11:40, 11:50, 12:00)",
    date: "2026-06-13",
    icon: "fluent:trophy-24-regular",
  },
  {
    title: "Sunday (Final Round + Departure Day)",
    description: "Latah Creek (8:42, 8:51, 9:00). Final Round. BuzzCup and the clear jacket will be awarded. Travel home.",
    date: "2026-06-14",
    icon: "la:plane-departure",
  },
];
