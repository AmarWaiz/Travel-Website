import { TEAM } from "./images";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

/**
 * PLACEHOLDER: replace with real data — every team member below is sample
 * copy written for layout purposes.
 */
export const team: TeamMember[] = [
  {
    name: "Mara Ellison",
    role: "Founder & Lead Guide",
    bio: "Walked every Travle route before it carried a group. Leads the Karakoram and Oman departures.",
    photo: TEAM[0].src,
  },
  {
    name: "Jonas Weber",
    role: "Operations Director",
    bio: "Keeps the trains, boats and border crossings running on time across three continents.",
    photo: TEAM[1].src,
  },
  {
    name: "Ayesha Khan",
    role: "Head of Guiding",
    bio: "Trains every Travle guide personally. Believes a good guide talks 30 percent of the time, maximum.",
    photo: TEAM[2].src,
  },
  {
    name: "Tomás Rivera",
    role: "Product & Routes",
    bio: "Scouts new routes on foot with a notebook. Responsible for the Amalfi and Balkans itineraries.",
    photo: TEAM[3].src,
  },
  {
    name: "Ingrid Solberg",
    role: "Winter Specialist",
    bio: "Runs the Lapland season. Can read aurora forecasts like a stock ticker and drive anything with a sled.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
];
