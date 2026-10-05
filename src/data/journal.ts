import { BLOG_BREAKFAST, BLOG_DESERT_PACKING } from "./images";

import type { TripImage } from "./trips";

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export type JournalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "image"; image: TripImage; caption: string };

export interface JournalPost {
  slug: string;
  noteNo: string;
  title: string;
  place: string;
  country: string;
  coordinates: string;
  date: string;
  readingMinutes: number;
  excerpt: string;
  hero: TripImage;
  body: JournalBlock[];
}

const fmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const d = (iso: string) => fmt.format(new Date(iso + "T12:00:00"));

export const journalPosts: JournalPost[] = [
  {
    slug: "breakfast-at-2900-metres",
    noteNo: "01",
    title: "Breakfast at 2,900 metres",
    place: "Karimabad, Hunza",
    country: "Pakistan",
    coordinates: "36°19′N 74°39′E",
    date: d("2026-04-12"),
    readingMinutes: 4,
    excerpt:
      "What the morning actually looks like in a Hunza guesthouse: the stove, the apricot jam, and why we schedule nothing before nine.",
    hero: {
      src: BLOG_BREAKFAST.src,
      alt: BLOG_BREAKFAST.alt,
    },
    body: [
      {
        type: "p",
        text: "The stove is lit at six. You hear it before you see anything, a soft iron ticking from the kitchen, and then the smell of last night's coals being coaxed back. Our guesthouse in Karimabad has eight rooms and one stove that does all the work.",
      },
      {
        type: "p",
        text: "Breakfast is at eight and it does not move. Parathas, eggs from the hens you can hear, apricot jam made from last summer's fruit, and tea that arrives in a pot big enough for the table. The jam is the thing people write home about. It tastes like the valley decided to keep summer in a jar.",
      },
      {
        type: "image",
        image: {
          src: u("1483728642387-6c3bdd6c93e5"),
          alt: "Stone terraces climbing a mountainside above a river",
        },
        caption: "Terraces above Karimabad, planted out for the short growing season.",
      },
      {
        type: "h2",
        text: "Why nothing starts before nine",
      },
      {
        type: "p",
        text: "We used to schedule the fort visit for eight thirty. Then we watched three groups in a row eat breakfast standing up, and we stopped. A trip is a sequence of mornings, and a rushed morning poisons the day. So: breakfast at eight, boots on at nine, and the mountains are not going anywhere.",
      },
      {
        type: "p",
        text: "The walk to Baltit Fort takes forty minutes uphill. By the time we reach the courtyard the sun has cleared Ultar Sar and the whole valley is lit. That is the photograph. It happens every clear morning, and it never gets old, which is why we built the whole itinerary around being there for it.",
      },
    ],
  },
  {
    slug: "belgrade-bar-sleeper-annotated",
    noteNo: "02",
    title: "The Belgrade to Bar sleeper, annotated",
    place: "Dinaric Alps",
    country: "Serbia and Montenegro",
    coordinates: "43°10′N 19°05′E",
    date: d("2026-07-20"),
    readingMinutes: 5,
    excerpt:
      "Notes from twelve hours on the night train: the border stop, the viaduct at dawn, and what to pack for a four-berth compartment.",
    hero: {
      src: u("1565019011521-b0575cbb57c8"),
      alt: "A railway line curving through green hills in early light",
    },
    body: [
      {
        type: "p",
        text: "The train leaves Belgrade at 21:10, and the first hour is pure theatre. Vendors on the platform, the conductor checking tickets with a hole punch that must be fifty years old, and the slow pull out past the Sava river with the fortress lit up on the hill.",
      },
      {
        type: "p",
        text: "Compartments sleep four. Ours had two Serbian students, one retired engineer from Niš, and me. The engineer produced rakija within twenty minutes. This is not in the brochure because it cannot be promised, but it happens more often than not.",
      },
      {
        type: "image",
        image: {
          src: u("1532105956626-9569c03602f6"),
          alt: "Inside a grand iron-and-glass railway station with trains at the platforms",
        },
        caption: "The 21:10 out of Belgrade — everyone photographs the departure.",
      },
      {
        type: "h2",
        text: "The 5:40 border",
      },
      {
        type: "p",
        text: "You will be woken at the Serbian-Montenegrin border. Passports are collected, stamped somewhere down the corridor, and returned. It takes forty minutes and the train does not move. Go back to sleep. The rocking resumes and the next thing you know it is dawn and the track is on a viaduct 200 metres above a valley.",
      },
      {
        type: "p",
        text: "Practical notes: bring earplugs, a headtorch for the top bunk, and snacks for the morning. The dining car exists in theory. Breakfast is a burek bought from a platform vendor at Bijelo Polje, eaten watching the mountains turn pink. Total cost: two euros.",
      },
    ],
  },
  {
    slug: "sand-gets-everywhere",
    noteNo: "03",
    title: "Sand gets everywhere: a desert packing list",
    place: "Dhofar",
    country: "Oman",
    coordinates: "20°07′N 55°42′E",
    date: d("2026-11-28"),
    readingMinutes: 4,
    excerpt:
      "Eight days in the Empty Quarter teaches you what matters. Five items earn their place, and one expensive jacket does not.",
    hero: {
      src: BLOG_DESERT_PACKING.src,
      alt: BLOG_DESERT_PACKING.alt,
    },
    body: [
      {
        type: "p",
        text: "On the third morning of our November departure, a traveller named Priya emptied her bag onto a camp rug and asked the group to vote on what she should send back to Salalah with the supply car. The expensive waterproof jacket lost unanimously. It had rained nowhere within 400 kilometres, and the jacket was just a heavy pillow.",
      },
      {
        type: "h2",
        text: "What earns its place",
      },
      {
        type: "p",
        text: "A buff, for the wind on dune crests. Lip balm with SPF, because the air is dry enough to crack skin in a day. A headtorch with a red mode, so you can find the latrine tent without ruining everyone's night vision. A paperback you are willing to leave in camp. And sandals with a back strap, for the hours between the hot sand cooling and boots feeling like too much.",
      },
      {
        type: "p",
        text: "What does not: more than two changes of clothes, anything white, a drone (banned near the border zone anyway), and any toiletry in a container bigger than 100 ml. The camp has water for washing but every litre was driven in, so the group shares a strict and cheerful economy of it.",
      },
      {
        type: "p",
        text: "Priya's jacket went back with the supply car. She did the last five days in a ten-pound fleece and says it was the best decision of the trip. The desert is good at editing.",
      },
    ],
  },
];

export function getPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
