/**
 * Central image registry — every photo on the site lives here exactly once.
 * All URLs verified HTTP 200 on 2026-10-05. Never reuse an image elsewhere.
 * Slots marked HUNT2 are filled by the supplementary hunt (image-hunt-2.md).
 */

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export interface SiteImage {
  src: string;
  alt: string;
}

const img = (id: string, alt: string): SiteImage => ({ src: u(id), alt });

// ---- Tour galleries & heroes (6 per tour; HUNT2 slots filled later) ----
export const TOURS: Record<string, SiteImage[]> = {
  hunza: [
    img("1581791534721-e599df4417f7", "Glacial river winding through a pine valley beneath rocky peaks, Hunza"),
    img("1434725039720-aaad6dd32dfe", "Alpine meadow at sunrise beneath jagged Karakoram peaks"),
    img("1484402628941-0bb40fc029e7", "Morning mist drifting over a pine-covered valley"),
    img("1470252649378-9c29740c9fa8", "Sunrise light over layered misty hills"),
    // HUNT2: Hunza terraced village
    img("1584043204475-8cc101d6c77a", "Winding mountain road through a green Himalayan valley"),
    // HUNT2: Karakoram high peaks
    img("1567226475328-9d6baaf565cf", "Alpine lake with snowy peaks and pine forest"),
  ],
  oman: [
    img("1547234935-80c7145ec969", "Red sand desert plain with towering dark rock formations"),
    // HUNT2: Wahiba dunes
    img("1500530855697-b586d89ba3ee", "Paved desert road running through a red-rock canyon"),
    // HUNT2: camel caravan
    img("1758705023495-b64dfe01f970", "Glowing tent under the Milky Way at a desert night camp"),
    // HUNT2: Omani fort
    img("1657523389864-ff600a89fa56", "Courtyard of Nizwa Fort with cannon and mountains behind"),
    img("1657523389861-b6aa980018f0", "Omani men performing a traditional sword dance in a fort courtyard"),
    img("1564138630043-30affa37d79f", "Misty mountain road in Salalah with Arabic road sign"),
    // HUNT2: wadi — MISSING (no verified wadi photo found)
    // HUNT2: Omani coastline — MISSING (no verified Omani coast photo found)
  ],
  amalfi: [
    img("1547036967-23d11aacaee0", "Aerial view of a rocky coastline meeting the sea"),
    img("1458644267420-66bc8a5f21e4", "Seafood pasta served at a coastal Italian restaurant table"),
    // HUNT2: Positano/Amalfi cliff village — used for hero slide 3 instead (no repeat)
    // HUNT2: lemons
    img("1590502593747-42a996133562", "Pile of fresh Amalfi lemons, tight crop"),
    // HUNT2: boat on the coast
    img("1569263979104-865ab7cd8d13", "Boat on the open Tyrrhenian Sea"),
    // HUNT2: coastal road — MISSING (no verified Amalfi coastal road found)
    // HUNT3: Positano from the sea
    img("1441120526655-678eca71862a", "Positano pastel houses cascading to the beach, seen from the sea"),
    // HUNT3: Positano village close-up
    img("1510041883570-1c5b27d85cb8", "Stacked colorful houses of Positano against the mountain in warm light"),
  ],
  delhi: [
    // HUNT3: India Gate through the canopy — tour hero (genuinely Delhi)
    img("1587474299692-8b4f0f65a328", "India Gate framed by the sandstone canopy on Kartavya Path"),
    img("1564507592333-c60657eea523", "Mughal monument at sunrise with reflecting pool"),
    // HUNT2: Humayun's tomb — MISSING (no verified photo found)
    // HUNT2: Old Delhi street — MISSING (no verified photo found)
    // HUNT2: market
    img("1596040033229-a9821ebd058d", "Indian spices — turmeric, chilli and cardamom — laid out flat"),
    // HUNT2: Lotus temple — MISSING (no verified photo found)
    // HUNT2: street food
    img("1601050690597-df0568f70950", "Crispy samosas with green chutney on a wooden plate"),
    // HUNT3: India Gate arch close-up
    img("1585828068970-7b75082485cd", "India Gate arch close-up with the INDIA inscription"),
    // HUNT3: India Gate street level
    img("1585160113536-a14b15e40174", "India Gate from the road with a cycle-rickshaw in the foreground"),
  ],
  balkans: [
    // HUNT2: mountain train
    img("1543237390-edca99e0f683", "Mountain railway station with tracks toward snow-capped peaks"),
    // HUNT2: railway viaduct — MISSING (no verified Balkan viaduct found)
    // HUNT2: Belgrade — MISSING (no verified Belgrade photo found)
    // HUNT2: Kotor old town — MISSING (no verified old-town-only photo found)
    // HUNT2: Montenegro coast — MISSING (no verified Bar coast photo found)
    // HUNT2: Dinaric mountains
    img("1509316975850-ff9c5deb0cd9", "Misty coniferous forest, foggy Dinaric treetops"),
    img("1441974231531-c6227db76b6e", "Sunlit forest trail through tall Dinaric trees"),
    img("1693581176773-a5f2362209e6", "Dramatic rocky peaks with green valleys and snow patches"),
    img("1464822759023-fed622ff2c3b", "Panoramic snow-capped range above a forested valley"),
    // HUNT3: Kotor Bay
    img("1502824420498-012d4c4f0c42", "Kotor Bay with red-roofed old town and mountains behind"),
  ],
  lapland: [
    img("1483347756197-71ef80e95f73", "Green aurora borealis over a silhouetted pine forest"),
    img("1531366936337-7c912a4589a7", "Purple and green aurora over snowy fells at night"),
    img("1554190907-650057d92a1a", "Snow-covered mountain peak rising above pine forest"),
    img("1640557283858-59d8db7327ad", "Wooden cabin in a snow-laden forest"),
    img("1640557284252-03c9c92e6f81", "Snowy cabin among tall pines"),
    // HUNT2: husky sled team or reindeer — MISSING; using starry arctic night instead
    img("1519681393784-d120267933ba", "Milky Way and a shooting star over snow-covered arctic pines"),
  ],
};

// ---- Destination heroes ----
export const DESTINATION_HERO: Record<string, SiteImage> = {
  karakoram: img("1544735716-392fe2489ffa", "Towering snow peaks with trekkers on a Himalayan trail"),
  oman: img("1473580044384-7ba9967e16a0", "Rippled sand dunes with footprints at golden hour"),
  amalfi: img("1516483638261-f4dbaf036963", "Pastel houses stacked on cliffs above the sea, Manarola"),
  // delhi: HUNT2 — India Gate
  delhi: img("1587474260584-136574528ed5", "India Gate at dusk, illuminated, with lawns"),
  montenegro: img("1614122027743-50a9e6e8002f", "Bay of Kotor with red-roofed town and mountains"),
  lapland: img("1579033461380-adb47c3eb938", "Green aurora over a mountain mirrored in a still lake"),
};

// ---- Categories ----
export const CATEGORY_IMG: Record<string, SiteImage> = {
  adventure: img("1551632811-561732d1e306", "Two backpackers hiking a mountain trail toward snowy peaks"),
  beach: img("1728495674833-faf9570eb797", "Aerial view of a tropical beach with turquoise water"),
  mountains: img("1644485071092-27c621183311", "Snow-dusted rocky peaks in layered ridges"),
  city: img("1552832230-c0197dd311b5", "The Colosseum in Rome glowing at dusk"),
  // rail: freight locomotive — honest stand-in until a scenic passenger-rail photo is found
  rail: img("1474487548417-781cb71495f3", "Freight locomotive on railway tracks"),
  winter: img("1767274775592-289acf66de14", "Log cabin among snow-covered pines"),
};

// ---- Why choose us ----
export const WHY_US: SiteImage[] = [
  img("1543269865-cbf427effbad", "Group of young travellers laughing around a table"),
  img("1529156069898-49953e39b3ac", "Friends arm-in-arm watching the sunset over the water"),
  img("1511632765486-a01980e01a18", "Four friends silhouetted against sunset on a hilltop"),
];

// ---- Stats band background ----
export const STATS_BG = img("1508739773434-c26b3d09e071", "Dramatic rocky peaks at dusk");

// ---- Deals ----
export const DEAL_BEACH = img("1532408840957-031d8034aeef", "Overwater bungalows on turquoise water at sunset");
export const DEAL_MOUNTAIN = img("1554190907-415f9faecb06", "Vast snowy mountain valley under bright clouds");
export const PROMO_TALL = img("1454391304352-2bf4678b1a7a", "Palm trees against a bright blue sky");

// ---- Video section background ----
export const VIDEO_BG = img("1476610182048-b716b8518aae", "Waterfall pouring over green cliffs at sunset");

// ---- Testimonial avatars ----
export const AVATARS: SiteImage[] = [
  img("1573496359142-b8d87734a5a2", "Smiling woman by a bright window"),
  img("1531123897727-8f129e1688ce", "Woman portrait in soft light"),
  img("1506794778202-cad84cf45f1d", "Bearded young man, studio headshot"),
  img("1500648767791-00dcc994a43e", "Smiling man in a grey sweater"),
  img("1560250097-0b93528c311a", "Man with glasses in a blazer"),
  img("1519085360753-af0119f7cbe7", "Man in a suit with arms crossed"),
];

// ---- Blog heroes ----
export const BLOG_BREAKFAST = img("1533089860892-a7c6f0a88666", "Fried egg on toast with grilled tomatoes");
// BLOG_DESERT_PACKING: HUNT2
export const BLOG_DESERT_PACKING = img("1645013283037-75b328ba9e8f", "Backpacking and camping gear laid out flat on a table");
// BLOG_NIGHT_TRAIN: HUNT2 — MISSING (no verified sleeper-cabin photo found)

// ---- Instagram strip ----
export const INSTAGRAM: SiteImage[] = [
  img("1501426026826-31c667bdf23d", "Pink flamingo float drifting in turquoise water"),
  img("1559827260-dc66d52bef19", "Ocean wave curling under a sunset sky"),
  img("1762921711357-b92605981dba", "Quiet tropical beach lined with palms"),
  img("1439066615861-d1af74d74000", "Wooden dock stretching over a glassy lake"),
  img("1522163182402-834f871fd851", "Rock climber on an overhanging cliff above the sea"),
  img("1476673160081-cf065607f449", "Gentle waves washing over sand at sunset"),
];

// ---- Team ----
export const TEAM: SiteImage[] = [
  img("1508214751196-bcfd4ca60f91", "Smiling woman outdoors in golden-hour light"),
  img("1438761681033-6461ffad8d80", "Young woman by the water in natural light"),
  img("1494790108377-be9c29b29330", "Laughing woman in red, outdoors"),
  img("1534528741775-53994a69daeb", "Woman portrait in soft studio light"),
  // HUNT2: guide 5
  // HUNT2: guide 6
];

// ---- About page ----
export const ABOUT_MAP = img("1524661135-423995f22d0b", "World map covered in colorful travel pins");
export const ABOUT_TRAIL = img("1476297820623-03984cf5cdbb", "Lone hiker with backpack on a high mountain ridge");
