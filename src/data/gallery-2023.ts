import type { GalleryPhoto } from './gallery';
import BenTeeBox from '../assets/bc2023/benteebox.png';
import ChelanBenMike from '../assets/bc2023/chelanbenmike.png';
import DaCrew from '../assets/bc2023/dacrew.png';
import Dinner from '../assets/bc2023/dinner.png';
import DinnerBenMike from '../assets/bc2023/dinnerbenmike.png';
import GambleMillsJesseBenMike from '../assets/bc2023/Gamble-MillsJesseBenMike.png';
import GambleCarts from '../assets/bc2023/gamblecarts.png';
import JesseBenMike from '../assets/bc2023/JesseBenMike.png';
import KatyFoodPrep from '../assets/bc2023/katyfoodprep.png';
import MikeTeeShot from '../assets/bc2023/miketeeshot.png';
import MillsTableSetting from '../assets/bc2023/millstablesetting.png';
import Sponsor from '../assets/bc2023/sponsor.png';

export const photos: GalleryPhoto[] = [
  { src: DaCrew, alt: "The crew", caption: "The crew" },
  { src: GambleMillsJesseBenMike, alt: "Mills, Jesse, Ben, and Mike at Gamble Sands", caption: "Mills, Jesse, Ben & Mike at Gamble Sands" },
  { src: JesseBenMike, alt: "Jesse, Ben, and Mike", caption: "Jesse, Ben & Mike" },
  { src: GambleCarts, alt: "Carts at Gamble Sands", caption: "Carts at Gamble Sands" },
  { src: ChelanBenMike, alt: "Chelan — Ben and Mike", caption: "Chelan" },
  { src: BenTeeBox, alt: "Ben at the tee box", caption: "Ben at the tee box" },
  { src: MikeTeeShot, alt: "Mike's tee shot", caption: "Mike's tee shot" },
  { src: Dinner, alt: "Dinner", caption: "Dinner" },
  { src: DinnerBenMike, alt: "Dinner — Ben and Mike", caption: "Dinner with Ben & Mike" },
  { src: MillsTableSetting, alt: "Mills setting the table", caption: "Mills setting the table" },
  { src: KatyFoodPrep, alt: "Katy food prep", caption: "Katy on food prep" },
  { src: Sponsor, alt: "Sponsor", caption: "Sponsor" },
];
