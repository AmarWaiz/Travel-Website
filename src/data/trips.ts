import { TOURS } from "./images";

export type Difficulty = "Easy" | "Moderate" | "Demanding";

export interface TripImage {
  src: string;
  alt: string;
}

export interface Departure {
  /** ISO date, e.g. "2027-03-14" */
  date: string;
  seatsLeft: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  text: string;
  image?: TripImage;
}

export interface Faq {
  q: string;
  a: string;
}

export type TripCategory =
  | "Adventure"
  | "Beach"
  | "Mountains"
  | "City"
  | "Rail"
  | "Winter";

export interface TripReview {
  name: string;
  /** e.g. "Travelled March 2026" */
  trip: string;
  rating: number;
  title: string;
  text: string;
}

export interface Trip {
  slug: string;
  fileNo: string;
  title: string;
  region: "Asia" | "Europe" | "Middle East";
  country: string;
  coordinates: string;
  days: number;
  maxGroup: number;
  difficulty: Difficulty;
  priceFrom: number;
  departures: Departure[];
  summary: string;
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  images: TripImage[];
  faq: Faq[];
  category: TripCategory;
  /** PLACEHOLDER: replace with real data */
  rating: number;
  /** PLACEHOLDER: replace with real data */
  reviewCount: number;
  /** Percent off, e.g. 15 for 15% */
  discount?: number;
  badge?: "Featured" | "Bestseller" | "New";
  highlights: string[];
  /** 6 gallery images for the tour detail page */
  gallery: TripImage[];
  languages: string[];
  /** PLACEHOLDER: replace with real data */
  reviews: TripReview[];
}

export const trips: Trip[] = [
  {
    slug: "hunza-skardu-karakoram",
    fileNo: "01",
    title: "Hunza to Skardu: The Karakoram Valleys",
    region: "Asia",
    country: "Pakistan",
    coordinates: "36°19′N 74°39′E",
    days: 10,
    maxGroup: 12,
    difficulty: "Moderate",
    priceFrom: 1480,
    departures: [
      { date: "2027-03-14", seatsLeft: 6 },
      { date: "2027-04-11", seatsLeft: 9 },
      { date: "2027-10-03", seatsLeft: 4 },
    ],
    summary:
      "Ten days on the old trade road between Hunza and Skardu. Apricot blossom in the lower valleys, glaciers you can walk to from the road, and nights in family-run guesthouses where dinner is whatever came out of the garden that day.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Gilgit",
        text: "Land in Gilgit by midday. We drive 100 km up the Hunza valley in the afternoon, stopping at the old Silk Road rock carvings. Dinner in Karimabad, asleep by ten.",
      },
      {
        day: 2,
        title: "Karimabad on foot",
        text: "Baltit Fort in the morning, then a walk through the apricot orchards above town. The afternoon is unscheduled. Your guide will tell you where the best walnut cake is.",
      },
      {
        day: 3,
        title: "Hopper Glacier",
        text: "Drive to Hopper village, then walk the lateral moraine to the glacier snout. Four hours on foot, 300 metres of ascent. Back in Karimabad for dinner.",
      },
      {
        day: 4,
        title: "Khunjerab road",
        text: "North on the Karakoram Highway to the Khunjerab Pass at 4,693 metres. Yak herders, border pillars, thin air. We sleep back down at Sost to keep the altitude honest.",
      },
      {
        day: 5,
        title: "To Skardu",
        text: "The long driving day: 230 km south to Skardu along the Indus gorge. We stop every 90 minutes. Nobody enjoys a van for eight hours straight, so we plan around it.",
      },
      {
        day: 6,
        title: "Shigar Valley",
        text: "Shigar Fort in the morning, then the cold desert dunes at Katpana in the afternoon. Sand at 2,200 metres, with the Karakoram behind it.",
      },
      {
        day: 7,
        title: "Deosai Plains",
        text: "Up to the Deosai plateau, 4,114 metres, one of the highest plains on earth. Brown bears if we are lucky, marmots if we are not. Picnic lunch by Sheosar Lake.",
      },
      {
        day: 8,
        title: "Khaplu",
        text: "East to Khaplu and the 700-year-old Chaqchan Mosque. Apricot drying racks on every roof. We stay in a restored royal residence with twelve rooms.",
      },
      {
        day: 9,
        title: "Upper Kachura Lake",
        text: "A slow day. Walk the shore of Upper Kachura Lake in the morning, rest in the afternoon, and a final group dinner in Skardu. Breakfast tomorrow is at 6:30.",
      },
      {
        day: 10,
        title: "Fly out",
        text: "Morning flight Skardu to Islamabad, or the road if the weather closes the airport. We build one spare day into every itinerary for exactly this reason.",
      },
    ],
    included: [
      "9 nights in guesthouses and small hotels, all rooms en suite",
      "All ground transport in 4x4 vehicles with local drivers",
      "English-speaking guide plus a local fixer throughout",
      "All breakfasts, 7 dinners",
      "Park fees, fort entries and the Khunjerab permit",
      "Domestic flight Skardu to Islamabad, or road transfer",
    ],
    excluded: [
      "International flights to and from Islamabad",
      "Pakistani visa fee (we send the invitation letter)",
      "Lunches and 2 dinners",
      "Travel insurance (required)",
      "Tips for drivers and porters",
    ],
    images: TOURS.hunza.slice(0, 1),
    faq: [
      {
        q: "How fit do I need to be?",
        a: "Comfortable walking 4 to 5 hours with 400 metres of ascent. The Deosai day is at altitude but mostly flat. We set a pace the slowest walker can keep.",
      },
      {
        q: "Is the Skardu flight reliable?",
        a: "About 80 percent of the time in season. When it cancels, we drive, which takes 10 hours and is spectacular. Day 10 is a buffer day either way.",
      },
      {
        q: "What is the Wi-Fi situation?",
        a: "Patchy. Karimabad and Skardu have 4G most days. The valleys in between do not. Tell work you will be offline.",
      },
    ],
  category: "Mountains",
  rating: 4.9, // PLACEHOLDER: replace with real data
  reviewCount: 214, // PLACEHOLDER: replace with real data
  discount: 10,
  badge: "Bestseller",
  highlights: [
    "Walk to the Hopper Glacier with a local mountain guide",
    "Nights in family-run guesthouses in Karimabad and Shigar",
    "Cross the Deosai Plains, among the highest plateaus on earth",
    "Khunjerab Pass day on the old Silk Road",
    "All overland travel in private 4x4 vehicles",
  ],
  gallery: TOURS.hunza,
  languages: ["English", "Urdu"],
  reviews: [ // PLACEHOLDER: replace with real data
    {
      name: "Sarah Mitchell",
      trip: "Travelled March 2026",
      rating: 5,
      title: "The guides made the trip",
      text: "Our guide grew up in Karimabad and knew every trail and teahouse. The Deosai day alone was worth the flight.",
    },
    {
      name: "James Okafor",
      trip: "Travelled October 2025",
      rating: 5,
      title: "Challenging in the best way",
      text: "The walking days are honest but the pace is humane. Guesthouses were warm, food was superb.",
    },
    {
      name: "Elena Petrova",
      trip: "Travelled April 2026",
      rating: 4,
      title: "Spectacular, bring layers",
      text: "Weather changed plans twice and the team rerouted without fuss. Mornings at altitude are seriously cold.",
    },
  ],
  },
  {
    slug: "empty-quarter-oman",
    fileNo: "02",
    title: "The Empty Quarter by 4x4",
    region: "Middle East",
    country: "Oman",
    coordinates: "20°07′N 55°42′E",
    days: 8,
    maxGroup: 10,
    difficulty: "Moderate",
    priceFrom: 2150,
    departures: [
      { date: "2026-11-06", seatsLeft: 3 },
      { date: "2027-01-15", seatsLeft: 8 },
      { date: "2027-02-12", seatsLeft: 10 },
    ],
    summary:
      "Eight days driving the sand seas of Dhofar with Bedouin drivers. Five nights in dune camps with no hotels, no signal and no light pollution for 400 kilometres in any direction.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Salalah",
        text: "Land in Salalah, frankincense capital of the old world. We check tyre pressures, load water, and eat at the fish market. Early night. The desert starts tomorrow.",
      },
      {
        day: 2,
        title: "Into the sands",
        text: "North from Thumrait, tarmac ends after two hours. First dune camp by 4 pm. Your driver shows you how to read a dune face. Dinner cooked on coals.",
      },
      {
        day: 3,
        title: "Ubar country",
        text: "Drive to the lost city of Ubar, a frankincense trading post swallowed by a sinkhole. Three hours of dunes to get there. We camp 20 km short of it.",
      },
      {
        day: 4,
        title: "The high dunes",
        text: "The biggest dune crossings of the trip, some faces 200 metres tall. Nobody walks up them unless they want to. Camp in a corridor between two star dunes.",
      },
      {
        day: 5,
        title: "Rest day in camp",
        text: "No driving. Sleep, read, walk the dune ridge at dawn. The cooks bake bread in the sand. This is the day people remember most, and we do the least on it.",
      },
      {
        day: 6,
        title: "Mudayy",
        text: "East across the gravel plains to the well at Mudayy, where camel herders water their animals. We fill every jerrycan. Last full night under canvas.",
      },
      {
        day: 7,
        title: "Back to Salalah",
        text: "Out of the sands by noon, into Salalah by four. Hot showers, a proper bed, and dinner at a restaurant with tablecloths. You will have opinions about chairs.",
      },
      {
        day: 8,
        title: "Fly out",
        text: "Morning flight from Salalah. Most people route through Muscat or Dubai. We say goodbye at the airport and mean it.",
      },
    ],
    included: [
      "2 nights hotel in Salalah, 5 nights fully serviced dune camps",
      "Three 4x4 vehicles with Bedouin drivers and a lead guide",
      "All meals from dinner on day 1 to breakfast on day 8",
      "20 litres of water per person per day, plus tea and coffee",
      "Satellite phone and full medical kit in the lead vehicle",
    ],
    excluded: [
      "International flights to Salalah",
      "Omani visa (visa on arrival for most nationalities)",
      "Alcohol, which is not available in the desert camps",
      "Travel insurance (required)",
      "Sleeping bag (provided if you do not have one)",
    ],
    images: TOURS.oman.slice(0, 1),
    faq: [
      {
        q: "How cold are the desert nights?",
        a: "November to February nights drop to 8 to 12°C. The camps have proper winter sleeping bags and hot water bottles. Days are 24 to 28°C.",
      },
      {
        q: "Is there any phone signal?",
        a: "None after day 2. We carry a satellite phone for emergencies and check in with Salalah every evening. Families get the sat number before departure.",
      },
      {
        q: "Do I need desert driving experience?",
        a: "No. You are a passenger. The drivers have crossed these dunes for decades. If you want a turn at the wheel on a flat section, ask nicely.",
      },
    ],
  category: "Adventure",
  rating: 4.8, // PLACEHOLDER: replace with real data
  reviewCount: 167, // PLACEHOLDER: replace with real data
  discount: 15,
  badge: "Featured",
  highlights: [
    "Six nights wild camping deep in the Empty Quarter",
    "Dune driving with Bedouin drivers who read sand like roads",
    "The frankincense groves and lost city of Ubar",
    "Swim stops in the sinkholes of the Dhofar coast",
    "All camp equipment, cooks and meals included",
  ],
  gallery: TOURS.oman,
  languages: ["English", "Arabic"],
  reviews: [ // PLACEHOLDER: replace with real data
    {
      name: "David Chen",
      trip: "Travelled February 2026",
      rating: 5,
      title: "Nothing prepares you for the scale",
      text: "The dunes go on past the horizon in every direction. Camp logistics were flawless — hot food, cold nights, zero hassle.",
    },
    {
      name: "Amira Hassan",
      trip: "Travelled January 2026",
      rating: 5,
      title: "The drivers are artists",
      text: "Watching our driver surf a 200-metre dune face was better than any theme park. Felt safe the entire time.",
    },
    {
      name: "Tom Becker",
      trip: "Travelled February 2025",
      rating: 4,
      title: "Proper expedition",
      text: "This is not glamping — it is a real desert crossing with long driving days. Exactly what I signed up for.",
    },
  ],
  },
  {
    slug: "amalfi-coast-walk",
    fileNo: "03",
    title: "Walking the Amalfi Coast",
    region: "Europe",
    country: "Italy",
    coordinates: "40°38′N 14°36′E",
    days: 7,
    maxGroup: 12,
    difficulty: "Easy",
    priceFrom: 1980,
    departures: [
      { date: "2027-05-02", seatsLeft: 5 },
      { date: "2027-09-18", seatsLeft: 7 },
      { date: "2027-10-09", seatsLeft: 11 },
    ],
    summary:
      "Seven days on the footpaths above the Amalfi Coast, from Bomerano to Positano. Lemon groves, 1,700 steps down to the sea at one point, and long lunches that nobody hurries.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Bomerano",
        text: "Transfer from Naples airport to Bomerano, 650 metres above the sea. Kit check, route briefing, and dinner at the family agriturismo where we stay three nights.",
      },
      {
        day: 2,
        title: "Path of the Gods",
        text: "The famous one, and famous for a reason. Bomerano to Nocelle along the cliff path, 8 km, mostly flat. Lunch in Nocelle, then the 1,700 steps down to Positano. Knees permitting.",
      },
      {
        day: 3,
        title: "Amalfi and Ravello",
        text: "Down to Amalfi town by the old mule track, then up to Ravello for the gardens at Villa Cimbrone. The Terrace of Infinity does what it says. Bus back up.",
      },
      {
        day: 4,
        title: "Valle delle Ferriere",
        text: "Inland to the Ferriere valley: waterfalls, ironworks ruins, and the only place on the coast where wild orchids grow. 10 km, shaded most of the way.",
      },
      {
        day: 5,
        title: "To Sant'Agata",
        text: "Move day. Walk the ridge from Bomerano to Sant'Agata sui Due Golfi, bags transferred by van. New hotel, sea on both sides, dinner on the terrace.",
      },
      {
        day: 6,
        title: "Punta Campanella",
        text: "The walk to the tip of the Sorrentine peninsula, facing Capri across the water. Swim stop at the bay of Ieranto on the way back. Farewell dinner in Sant'Agata.",
      },
      {
        day: 7,
        title: "Depart",
        text: "Transfer to Naples airport after breakfast. Most flights leave after noon, which gives you time for one last coffee and a view.",
      },
    ],
    included: [
      "6 nights in family-run hotels, all rooms en suite",
      "All breakfasts, 5 picnic or trattoria lunches, 4 dinners",
      "Luggage transfers between hotels",
      "English-speaking walking guide throughout",
      "All local buses and the Naples airport transfers",
    ],
    excluded: [
      "Flights to Naples",
      "2 dinners and drinks",
      "Entrance to Villa Cimbrone gardens (12 euros)",
      "Travel insurance (required)",
      "Walking poles (available to borrow)",
    ],
    images: TOURS.amalfi.slice(0, 1),
    faq: [
      {
        q: "How hard is the walking?",
        a: "Easy to moderate. Days are 8 to 12 km with 300 to 600 metres of descent. The steps down to Positano are the crux. Poles help and we go slowly.",
      },
      {
        q: "When is the best month?",
        a: "May for wildflowers, September for warm seas. October is quieter and the light is better for photography. August we do not run this trip.",
      },
      {
        q: "Can I skip a walking day?",
        a: "Yes. Days 3 and 4 have easy opt-outs with the van, and Sant'Agata is a fine place to sit with a book.",
      },
    ],
  category: "Beach",
  rating: 4.9, // PLACEHOLDER: replace with real data
  reviewCount: 328, // PLACEHOLDER: replace with real data
  badge: "Bestseller",
  highlights: [
    "The Path of the Gods from Bomerano to Positano",
    "Swim stops at Fornillo beach and Punta Campanella",
    "Ravello's gardens and the Terrace of Infinity",
    "Lemon groves and waterfalls of the Valle delle Ferriere",
    "Luggage transferred between hotels every walking day",
  ],
  gallery: TOURS.amalfi,
  languages: ["English", "Italian"],
  reviews: [ // PLACEHOLDER: replace with real data
    {
      name: "Claire Dubois",
      trip: "Travelled May 2026",
      rating: 5,
      title: "The Path of the Gods lives up to it",
      text: "We walked it on a clear morning with the whole coast below us. Hotels were small, family-run, perfectly placed.",
    },
    {
      name: "Robert Kim",
      trip: "Travelled September 2025",
      rating: 5,
      title: "Walking plus swimming is the formula",
      text: "Mornings on the trails, afternoons in the sea. The luggage transfer meant we carried only daypacks.",
    },
    {
      name: "Anna Kowalski",
      trip: "Travelled June 2026",
      rating: 5,
      title: "Worth every step",
      text: "Some climbs are steep but the guide sets a sensible pace and there is always a granita waiting at the top.",
    },
  ],
  },
  {
    slug: "delhi-layer-by-layer",
    fileNo: "04",
    title: "Delhi, Layer by Layer",
    region: "Asia",
    country: "India",
    coordinates: "28°36′N 77°13′E",
    days: 6,
    maxGroup: 10,
    difficulty: "Easy",
    priceFrom: 1240,
    departures: [
      { date: "2026-11-20", seatsLeft: 6 },
      { date: "2027-02-05", seatsLeft: 9 },
      { date: "2027-03-12", seatsLeft: 2 },
    ],
    summary:
      "Six days in Delhi with a historian and a food writer. Mughal tombs in the morning, Old Delhi on foot after lunch, and dinners in places that do not appear in guidebooks.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Delhi",
        text: "Land at Indira Gandhi airport, transfer to our haveli hotel in the old city. Evening walk around the neighbourhood to fix your bearings. Dinner on the roof.",
      },
      {
        day: 2,
        title: "Old Delhi on foot",
        text: "Jama Masjid at opening time, then the lanes of Chandni Chowk with our food writer: parathas, jalebis, and a spice market that stains your hands yellow. Rest in the heat of the afternoon.",
      },
      {
        day: 3,
        title: "Mughal Delhi",
        text: "Humayun's Tomb and the Lodhi Gardens in the morning with our historian. Afternoon at the National Museum, then dinner in Nizamuddin with qawwali music at the dargah.",
      },
      {
        day: 4,
        title: "New Delhi",
        text: "Lutyens' Delhi by bicycle at 7 am, before the traffic wakes. India Gate, the parliament streets, then the Crafts Museum. Evening free.",
      },
      {
        day: 5,
        title: "Tughlaqabad and the kitchen",
        text: "The ruined fortress of Tughlaqabad in the morning. Afternoon cooking session with our food writer: dal, roti, and the correct way to eat with your hands. You eat what you cook.",
      },
      {
        day: 6,
        title: "Depart",
        text: "Slow morning, last walk through the bazaar for anyone still standing, and transfers to the airport from noon. Most flights leave in the evening.",
      },
    ],
    included: [
      "5 nights in a restored haveli hotel in Old Delhi",
      "All breakfasts, 4 lunches, 3 dinners including the cooking session",
      "Historian guide and food writer throughout",
      "All monument entries and the bicycle tour",
      "Airport transfers in air-conditioned vehicles",
    ],
    excluded: [
      "International flights to Delhi",
      "Indian visa fee",
      "2 dinners and drinks",
      "Travel insurance (required)",
      "Shopping, which will happen anyway",
    ],
    images: TOURS.delhi.slice(0, 1),
    faq: [
      {
        q: "Is Delhi safe for a first-time visitor to India?",
        a: "Yes, with the usual city sense. You are with local guides from arrival to departure, and the haveli is in a lane the staff know street by street.",
      },
      {
        q: "What about the food and water?",
        a: "We eat where our food writer eats, which means busy places with high turnover. Bottled water everywhere. Most travellers have zero problems.",
      },
      {
        q: "How much walking is there?",
        a: "About 6 to 8 km a day on foot, in short stretches with long sit-down breaks. Delhi rewards the slow.",
      },
    ],
  category: "City",
  rating: 4.7, // PLACEHOLDER: replace with real data
  reviewCount: 189, // PLACEHOLDER: replace with real data
  badge: "New",
  highlights: [
    "Old Delhi food walk through Chandni Chowk with a chef guide",
    "Humayun's Tomb at opening time, before the crowds",
    "Sunrise at India Gate with a historian",
    "Cooking session in a family home in South Delhi",
    "Metro, cycle-rickshaw and on foot — no tour buses",
  ],
  gallery: TOURS.delhi,
  languages: ["English", "Hindi"],
  reviews: [ // PLACEHOLDER: replace with real data
    {
      name: "Priya Sharma",
      trip: "Travelled November 2025",
      rating: 5,
      title: "Delhi finally made sense",
      text: "I have visited Delhi three times and never understood it until this trip. The layering of eras is extraordinary with the right guide.",
    },
    {
      name: "Michael Ross",
      trip: "Travelled February 2026",
      rating: 4,
      title: "Intense and brilliant",
      text: "Old Delhi is a full-sensory experience. The food walk alone justifies the trip — come hungry.",
    },
    {
      name: "Yuki Tanaka",
      trip: "Travelled December 2025",
      rating: 5,
      title: "The cooking day was special",
      text: "Learning to make parathas in someone's home kitchen told me more about Delhi than any monument.",
    },
  ],
  },
  {
    slug: "belgrade-bar-sleeper",
    fileNo: "05",
    title: "The Balkan Sleeper: Belgrade to Bar",
    region: "Europe",
    country: "Serbia and Montenegro",
    coordinates: "44°48′N 20°27′E",
    days: 5,
    maxGroup: 14,
    difficulty: "Easy",
    priceFrom: 980,
    departures: [
      { date: "2027-06-11", seatsLeft: 12 },
      { date: "2027-07-09", seatsLeft: 8 },
      { date: "2027-08-20", seatsLeft: 6 },
    ],
    summary:
      "Five days from Belgrade to the Adriatic, mostly by rail. The night train over the Dinaric Alps, two days in the Bay of Kotor, and a final swim before the flight home.",
    itinerary: [
      {
        day: 1,
        title: "Belgrade",
        text: "Arrive Belgrade, walk the Kalemegdan fortress with our guide, and eat ćevapi in the Skadarlija quarter. Board the night train at 21:10. Compartments sleep four.",
      },
      {
        day: 2,
        title: "The night train",
        text: "Wake somewhere in the Dinaric Alps. 254 tunnels and 435 bridges between you and the sea, including the Mala Rijeka viaduct, 200 metres above the valley floor. Arrive Bar at noon, swim by two.",
      },
      {
        day: 3,
        title: "Bay of Kotor",
        text: "Drive the coast road to Kotor. Climb the city walls to St John's fortress, 1,350 steps, then take the boat to Our Lady of the Rocks. Dinner in the old town.",
      },
      {
        day: 4,
        title: "Lovćen",
        text: "Up the 25 hairpins to Mount Lovćen and the Njegoš mausoleum. On a clear day you see half of Montenegro. Afternoon swim at Dobrota, farewell dinner in Perast.",
      },
      {
        day: 5,
        title: "Depart",
        text: "Morning swim for the stubborn, then transfers to Tivat or Dubrovnik airport. Home by evening with salt still in your hair.",
      },
    ],
    included: [
      "1 night sleeper train Belgrade to Bar, 3 nights small hotels",
      "All breakfasts, 2 dinners",
      "Rail passes and all transfers",
      "English-speaking guide throughout",
      "Boat trip in the Bay of Kotor",
    ],
    excluded: [
      "Flights to Belgrade and from Tivat or Dubrovnik",
      "3 dinners and drinks",
      "Lovćen national park entry (5 euros)",
      "Travel insurance (required)",
    ],
    images: TOURS.balkans.slice(0, 1),
    faq: [
      {
        q: "How comfortable is the sleeper train?",
        a: "Honest answer: it is a proper Balkan sleeper, not a hotel. Four-berth compartments, bedding provided, the rocking sends most people to sleep. Earplugs in the field notes pack.",
      },
      {
        q: "What if the train is cancelled?",
        a: "It runs daily in summer and cancellations are rare. If it happens, we take the daytime train instead, which is arguably better for the views.",
      },
      {
        q: "Is five days too short?",
        a: "It is a taster, deliberately. Most people extend in Kotor or Dubrovnik. We can arrange the extra hotel nights.",
      },
    ],
  category: "Rail",
  rating: 4.8, // PLACEHOLDER: replace with real data
  reviewCount: 142, // PLACEHOLDER: replace with real data
  discount: 20,
  highlights: [
    "The full Belgrade to Bar line in a private sleeper compartment",
    "Mala Rijeka viaduct, the highest railway bridge in Europe",
    "Two nights inside Kotor's old town walls",
    "All border crossings handled by your guide",
    "Dining car dinners included on the night train",
  ],
  gallery: TOURS.balkans,
  languages: ["English"],
  reviews: [ // PLACEHOLDER: replace with real data
    {
      name: "Henrik Larsen",
      trip: "Travelled June 2026",
      rating: 5,
      title: "Europe's great railway journey",
      text: "Waking up as the train crossed the Morača canyon is a memory I will keep. The sleeper compartments are comfortable and private.",
    },
    {
      name: "Fiona Gallagher",
      trip: "Travelled September 2025",
      rating: 5,
      title: "Kotor is the perfect ending",
      text: "Two slow days in the old town after the train was exactly right. Swimming, city walls, excellent seafood.",
    },
    {
      name: "Marco Rossi",
      trip: "Travelled May 2026",
      rating: 4,
      title: "Rail fans must do this",
      text: "The engineering on this line is absurd — 254 tunnels. Border stops take a while but the guide handles everything.",
    },
  ],
  },
  {
    slug: "lapland-february",
    fileNo: "06",
    title: "Lapland in February",
    region: "Europe",
    country: "Finland",
    coordinates: "68°25′N 23°38′E",
    days: 6,
    maxGroup: 8,
    difficulty: "Demanding",
    priceFrom: 2340,
    departures: [
      { date: "2027-02-04", seatsLeft: 4 },
      { date: "2027-02-18", seatsLeft: 7 },
      { date: "2027-03-04", seatsLeft: 5 },
    ],
    summary:
      "Six days above the Arctic Circle in the dark season. Snowshoe forests by headtorch, a night in a wilderness hut with no electricity, and the aurora if the sky cooperates. It usually does.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Hetta",
        text: "Fly to Kittilä, transfer 2 hours to Hetta. Kit issue: expedition sleeping bag, snowshoes, headtorch. Dinner at the lodge and an aurora briefing. Bed by ten.",
      },
      {
        day: 2,
        title: "Snowshoe basics",
        text: "A training day on the marked trails around Hetta, 8 km. How to move, how to dress, how to eat 5,000 calories without noticing. Sauna in the evening, as it will be every evening.",
      },
      {
        day: 3,
        title: "The hut night",
        text: "Ski or snowshoe 12 km to the Pallas wilderness hut. No electricity, no running water, wood stove. We cook together and watch the sky from the frozen lake. This is the point of the trip.",
      },
      {
        day: 4,
        title: "Back to Hetta",
        text: "Return trail in daylight, which in February means about six hours of blue twilight. Afternoon rest, equipment drying, and a talk on reading aurora forecasts.",
      },
      {
        day: 5,
        title: "Reindeer day",
        text: "Morning with a Sámi reindeer herder: feeding, sled basics, and lunch in a lavvu. Afternoon free for the village. Final night aurora watch from the fell behind the lodge.",
      },
      {
        day: 6,
        title: "Depart",
        text: "Transfer to Kittilä for midday flights. You will be tired in a way that sleep fixes completely.",
      },
    ],
    included: [
      "5 nights: lodge, wilderness hut and hotel, all heated",
      "Expedition clothing and equipment package",
      "All meals, cooked mostly over fire or stove",
      "Wilderness guide and Sámi herder visit",
      "All transfers from Kittilä",
    ],
    excluded: [
      "Flights to Kittilä",
      "Alcohol",
      "Travel insurance with winter sports cover (required)",
      "Personal base layers and boots (list provided)",
    ],
    images: TOURS.lapland.slice(0, 1),
    faq: [
      {
        q: "How cold does it actually get?",
        a: "February averages minus 12 to minus 25°C. The kit we issue is rated to minus 35. The rule is simple: no exposed skin, and tell the guide the moment your toes go numb.",
      },
      {
        q: "Will we definitely see the aurora?",
        a: "No, and anyone who promises it is lying. In February, with six nights and clear-sky hunting, our groups have seen it on 9 out of 10 trips.",
      },
      {
        q: "Why is it rated Demanding?",
        a: "The hut day is 12 km on snowshoes in deep cold, carrying your own kit. You need a base level of fitness and a tolerance for being uncomfortable for short, planned periods.",
      },
    ],
  category: "Winter",
  rating: 5.0, // PLACEHOLDER: replace with real data
  reviewCount: 96, // PLACEHOLDER: replace with real data
  badge: "Featured",
  highlights: [
    "Three nights of aurora hunting with a photographer guide",
    "A full husky sled day with your own dog team",
    "Ice fishing and sauna at a wilderness cabin",
    "Reindeer farm visit with a Sami family",
    "All thermal clothing provided, rated to −30°C",
  ],
  gallery: TOURS.lapland,
  languages: ["English", "Finnish"],
  reviews: [ // PLACEHOLDER: replace with real data
    {
      name: "Emma Wilson",
      trip: "Travelled February 2026",
      rating: 5,
      title: "Saw the lights three nights running",
      text: "The guides chase clear skies relentlessly — we drove two hours one night and were rewarded with the best display of my life.",
    },
    {
      name: "Lucas Meyer",
      trip: "Travelled February 2025",
      rating: 5,
      title: "The huskies stole the show",
      text: "Mushing your own team through silent forest is pure joy. The thermal suits really do work at −25.",
    },
    {
      name: "Sofia Andersson",
      trip: "Travelled March 2026",
      rating: 5,
      title: "Perfect winter week",
      text: "Every day had a clear highlight and the cabin evenings — sauna, dinner, aurora watch — were magical.",
    },
  ],
  },
];

export function getTrip(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}

export const REGIONS = ["Asia", "Europe", "Middle East"] as const;

export const DIFFICULTIES: Difficulty[] = ["Easy", "Moderate", "Demanding"];

export const DURATION_BUCKETS = [
  { id: "short", label: "Up to 6 days", test: (d: number) => d <= 6 },
  { id: "medium", label: "7 to 8 days", test: (d: number) => d >= 7 && d <= 8 },
  { id: "long", label: "9 days or more", test: (d: number) => d >= 9 },
] as const;

/** All departure months present in the data, as "YYYY-MM". */
export function getDepartureMonths(): { value: string; label: string }[] {
  const months = new Set<string>();
  for (const t of trips)
    for (const d of t.departures) months.add(d.date.slice(0, 7));
  const fmt = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  });
  return [...months]
    .sort()
    .map((m) => ({
      value: m,
      label: fmt.format(new Date(m + "-01T12:00:00")),
    }));
}
