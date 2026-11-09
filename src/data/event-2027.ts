/**
 * BuzzCup 2027 — dates, courses, and what's new. Mirrors config/event.ts in
 * buzz-cup-shooter (which drives the invite texts + personal invite pages);
 * keep the two in sync.
 */

export interface Day2027 {
  date: string; // YYYY-MM-DD
  label: string;
  title: string;
  course: string | null;
  holes: number;
  detail: string;
  icon: string;
}

export interface Course2027 {
  name: string;
  where: string;
  day: string;
  holes: number;
  hook: string;
}

export const event2027 = {
  year: 2027,
  name: "BuzzCup 2027",
  edition: "Year 5",
  location: "Chelan, WA",
  datesLabel: "June 10–13, 2027",
  arrival: "2027-06-10T15:00:00-07:00",
  capacity: 12,
  fee: 250,
  rsvpDeadline: "2027-01-15T23:59:00-08:00",
  rsvpDeadlineLabel: "January 15",
  // Live field status (who's IN) — served by buzz-cup-shooter
  fieldApi:
    import.meta.env.PUBLIC_SHOOTER_URL
      ? `${import.meta.env.PUBLIC_SHOOTER_URL}/api/field`
      : "https://buzz-cup-shooter.fly.dev/api/field",
};

export const schedule2027: Day2027[] = [
  {
    date: "2027-06-10",
    label: "Thursday",
    title: "Arrival",
    course: null,
    holes: 0,
    detail: "Roll into Chelan, check in, settle old scores.",
    icon: "la:plane-arrival",
  },
  {
    date: "2027-06-11",
    label: "Friday",
    title: "Opening Round",
    course: "Bear Mountain Ranch",
    holes: 18,
    detail: "18 holes above the lake to open the cup.",
    icon: "maki:golf",
  },
  {
    date: "2027-06-12",
    label: "Saturday",
    title: "36 at Gamble Sands",
    course: "Gamble Sands",
    holes: 36,
    detail: "Two rounds on the sand. Pack the rain gear this time.",
    icon: "maki:golf",
  },
  {
    date: "2027-06-13",
    label: "Sunday",
    title: "Final Round",
    course: "Desert Canyon",
    holes: 18,
    detail: "Final round. The cup and the Clear Jacket are awarded. Travel home.",
    icon: "fluent:trophy-24-regular",
  },
];

export const courses2027: Course2027[] = [
  {
    name: "Bear Mountain Ranch",
    where: "Chelan, WA",
    day: "Friday",
    holes: 18,
    hook: "The opener, perched above Lake Chelan. Where the cup was born, the cup begins again.",
  },
  {
    name: "Gamble Sands",
    where: "Brewster, WA",
    day: "Saturday",
    holes: 36,
    hook: "Thirty-six holes on the sand. The last time we were here, it hailed. The sand remembers.",
  },
  {
    name: "Desert Canyon",
    where: "Orondo, WA",
    day: "Sunday",
    holes: 18,
    hook: "The final round. Last visit was a wind apocalypse. The Clear Jacket goes home with whoever survives.",
  },
];

export const changes2027 = [
  {
    title: "The field grows to 12",
    body: "The biggest field in BuzzCup history. Twelve players, one cup.",
    emoji: "👥",
  },
  {
    title: "Two tracks",
    body: "The Championship track plays for the cup and the Clear Jacket. The Cash track adds daily cash games on top. Full rules coming soon.",
    emoji: "🏆💵",
  },
];
