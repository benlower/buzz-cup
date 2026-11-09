import type { ImageMetadata } from 'astro';
import CupAwakens from '../assets/bc2026/20260603-011830-1780449540250.jpg';
import TwoDaysOut from '../assets/bc2026/20260611-014450-1781142309615.jpg';
import WelcomeToSpokane from '../assets/bc2026/20260612-035025-1781236462024.jpg';
import PlungeBegins from '../assets/bc2026/20260612-144133-1781275313838.jpg';
import CreekAtQualchan from '../assets/bc2026/20260612-203207-1781296348615.jpg';
import CollarAndCreek from '../assets/bc2026/20260613-171526-1781370986862.jpg';

// Shooter's posts from the live event (served by buzz-cup-shooter).
const SHOOTER_URL = import.meta.env.PUBLIC_SHOOTER_URL ?? 'https://buzz-cup-shooter.fly.dev';

export interface Dispatch {
  title: string;
  date: string;
  slug: string;
  image?: ImageMetadata;
}

export const dispatches: Dispatch[] = [
  { title: "The Cup Awakens 🏆", date: "2026-06-02", slug: "20260603-011830", image: CupAwakens },
  { title: "Two Days Out. The Field Is (Mostly) Ready.", date: "2026-06-10", slug: "20260611-014450", image: TwoDaysOut },
  { title: "Welcome to Spokane. Nobody Asked, But Here We Are.", date: "2026-06-11", slug: "20260612-035025", image: WelcomeToSpokane },
  { title: "The Plunge Begins 🏌️‍♂️", date: "2026-06-12", slug: "20260612-144133", image: PlungeBegins },
  { title: "Creek at Qualchan: The Canyon Speaks", date: "2026-06-12", slug: "20260612-203207", image: CreekAtQualchan },
  { title: "The Collar, The Creek, and the Crimes Against Arithmetic", date: "2026-06-13", slug: "20260613-171526", image: CollarAndCreek },
  { title: "The Mustache Meets the Prairie — Circling Raven Reckoning", date: "2026-06-13", slug: "20260614-042705" },
];

export const dispatchUrl = (slug: string) => `${SHOOTER_URL}/posts/${slug}`;
