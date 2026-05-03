// Shared mock data for the Rover E-Logbook designs.
// Single source of truth so both directions render the same content.

const ROVER = {
  name: "Shaun Fernando",
  handle: "@shaun.f",
  age: 24,
  dob: "2001-08-14",
  troop: "21st Colombo Rovers",
  role: "Crew Member",
  joinedYear: 2022,
  city: "Colombo",
  email: "shaun.f@rovers.lk",
  phone: "+94 77 412 8830",
  motto: "Service Above Self",
  pronouns: "he/him",
};

const TROOPS = [
  "1st Colombo Rovers",
  "2nd Colombo Rovers",
  "3rd Colombo Rovers",
  "21st Colombo Rovers",
];

const POST_TYPES = [
  { id: "crew-meeting", label: "Crew Meeting" },
  { id: "crew-event", label: "Crew Event" },
  { id: "crew-in-council", label: "Crew-in-Council Meeting" },
  { id: "article", label: "Article" },
];

const STATS = {
  meetingsAttended: 47,
  eventsAttended: 18,
  postsPublished: 31,
  articlesWritten: 7,
  badgesEarned: 9,
  hoursOfService: 142,
  streakWeeks: 14,
  pendingApprovals: 2,
};

const BADGES = [
  { id: "service", name: "Service", earned: true,  tier: "Gold",   date: "Mar 2025", desc: "100+ hours of community service" },
  { id: "leader",  name: "Leadership", earned: true, tier: "Silver", date: "Jan 2025", desc: "Led 5 crew meetings" },
  { id: "first-aid", name: "First Aid", earned: true, tier: "Silver", date: "Nov 2024", desc: "Completed advanced first aid" },
  { id: "outdoor", name: "Outdoor Skills", earned: true, tier: "Gold", date: "Oct 2024", desc: "Hiked, climbed, camped — qualified" },
  { id: "scribe",  name: "Scribe", earned: true,   tier: "Bronze", date: "Sep 2024", desc: "10+ approved logbook entries" },
  { id: "mentor",  name: "Mentor", earned: true,   tier: "Bronze", date: "Aug 2024", desc: "Mentored junior scouts" },
  { id: "campcraft", name: "Campcraft", earned: true, tier: "Silver", date: "Jun 2024", desc: "Mastered camping fundamentals" },
  { id: "navigator", name: "Navigator", earned: true, tier: "Bronze", date: "Apr 2024", desc: "Map & compass certified" },
  { id: "rover-sq", name: "Rover Squire", earned: true, tier: "Bronze", date: "Feb 2024", desc: "Welcomed into the crew" },
  { id: "knight",  name: "Rover Knight", earned: false, tier: "Gold",   date: "—",       desc: "Investiture pending" },
  { id: "global",  name: "World Crew", earned: false, tier: "Silver", date: "—",       desc: "International event participant" },
  { id: "archive", name: "Archivist", earned: false, tier: "Bronze", date: "—",       desc: "Maintain crew archives 1y" },
];

const POSTS = [
  {
    id: "p1",
    type: "crew-event",
    title: "Knuckles Range Hike — Day Two",
    date: "2026-04-18",
    status: "approved",
    excerpt: "We started before sunrise. The mist on the cardamom hills made the ridge feel like another country, and Suren made tea on the small stove while we waited for the rest of the crew to catch up…",
    body: "We started before sunrise. The mist on the cardamom hills made the ridge feel like another country, and Suren made tea on the small stove while we waited for the rest of the crew to catch up.\n\nDay two was the long traverse. Eight hours under the canopy, then the open ridge, then a steep descent into the valley camp. I learned that I'd been packing my bag wrong — water bottles too high, tent too low, and by hour four every step felt like an argument.\n\nWe reached camp by dusk. Built fire, cooked, sang the crew anthem, slept under more stars than I have ever seen.",
    photos: 4,
    location: "Knuckles, Matale",
    duration: "2 days",
    attendees: 14,
    likes: 22,
    comments: 6,
  },
  {
    id: "p2",
    type: "crew-meeting",
    title: "Weekly Crew Meeting · 16 April",
    date: "2026-04-16",
    status: "approved",
    excerpt: "Discussed the upcoming blood donation drive. Volunteers were assigned roles. Sumudu raised a motion to extend Wednesday meetings by 30 minutes during exam season — carried unanimously…",
    body: "Discussed the upcoming blood donation drive. Volunteers were assigned roles. Sumudu raised a motion to extend Wednesday meetings by 30 minutes during exam season — carried unanimously.\n\nGuest: Skipper Asela shared notes from the District Round Table.",
    photos: 1,
    location: "Crew Den, Colombo 10",
    duration: "1.5 hours",
    attendees: 11,
    likes: 4,
    comments: 1,
  },
  {
    id: "p3",
    type: "crew-in-council",
    title: "Crew-in-Council · Q2 Planning",
    date: "2026-04-09",
    status: "approved",
    excerpt: "Quarterly planning. Budgets were tabled — we're under by Rs. 18,400 from the camp surplus. Tashi proposed a service project at the Wellawatte shelter; we'll vote next week…",
    body: "Quarterly planning. Budgets were tabled — we're under by Rs. 18,400 from the camp surplus. Tashi proposed a service project at the Wellawatte shelter; we'll vote next week.",
    photos: 0,
    location: "Crew Den, Colombo 10",
    duration: "2 hours",
    attendees: 9,
    likes: 2,
    comments: 0,
  },
  {
    id: "p4",
    type: "crew-event",
    title: "Blood Donation Drive — Town Hall",
    date: "2026-03-29",
    status: "approved",
    excerpt: "Our second drive this year. 64 units collected, well over the target. The mobile unit from the National Blood Centre was efficient; the queue moved faster than we'd planned for…",
    body: "Our second drive this year. 64 units collected, well over the target.",
    photos: 6,
    location: "Colombo Town Hall",
    duration: "8 hours",
    attendees: 22,
    likes: 41,
    comments: 12,
  },
  {
    id: "p5",
    type: "crew-meeting",
    title: "Weekly Crew Meeting · 26 March",
    date: "2026-03-26",
    status: "pending",
    excerpt: "Reviewed the donation drive logistics. Confirmed van bookings, refreshment counts, and the pre-event briefing schedule for Saturday morning…",
    body: "Reviewed the donation drive logistics.",
    photos: 0,
    location: "Crew Den, Colombo 10",
    duration: "1 hour",
    attendees: 10,
    likes: 0,
    comments: 0,
  },
  {
    id: "p6",
    type: "article",
    title: "On Service — and the trouble with mistaking it for charity",
    date: "2026-03-20",
    status: "approved",
    excerpt: "I have been thinking about the difference between giving and serving. They look identical from the outside, but they sit very differently inside the person doing them. Service, to me, is the harder one…",
    body: "I have been thinking about the difference between giving and serving.",
    photos: 0,
    location: null,
    duration: null,
    attendees: 0,
    likes: 18,
    comments: 5,
  },
];

const APPROVAL_QUEUE = [
  {
    id: "ap1",
    rover: "Sumudu Perera",
    troop: "21st Colombo Rovers",
    type: "crew-event",
    title: "Beach Cleanup — Mount Lavinia",
    submittedAt: "2 hours ago",
    excerpt: "We collected 22 sacks of plastic, glass and fishing line between the railway and the lighthouse. The crew from the 3rd joined us for the second hour…",
    photos: 5,
  },
  {
    id: "ap2",
    rover: "Tashi Fernando",
    troop: "21st Colombo Rovers",
    type: "crew-meeting",
    title: "Weekly Crew Meeting · 26 March",
    submittedAt: "Yesterday",
    excerpt: "Reviewed the donation drive logistics. Confirmed van bookings, refreshment counts, and the pre-event briefing schedule for Saturday…",
    photos: 0,
  },
  {
    id: "ap3",
    rover: "Imash de Silva",
    troop: "2nd Colombo Rovers",
    type: "article",
    title: "Why I keep a logbook (even when nobody reads it)",
    submittedAt: "2 days ago",
    excerpt: "There is a quiet, almost archival pleasure in writing down what happened. The act sharpens the memory; it also exposes which moments you cannot quite explain to yourself…",
    photos: 0,
  },
];

const DIRECTORY = [
  { troop: "1st Colombo Rovers",  founded: 1923, members: 18, mate: "Ravindu Jayasuriya", den: "Borella",    color: "#7c3a2e" },
  { troop: "2nd Colombo Rovers",  founded: 1936, members: 12, mate: "Imash de Silva",      den: "Bambalapitiya", color: "#4a5d3a" },
  { troop: "3rd Colombo Rovers",  founded: 1948, members: 21, mate: "Nadeera Bandara",     den: "Mount Lavinia", color: "#3a4d5d" },
  { troop: "21st Colombo Rovers", founded: 1971, members: 24, mate: "Asela Wickrama",      den: "Colombo 10",    color: "#5d3a4a" },
];

// Activity heatmap — last ~14 weeks of activity (0–4)
const ACTIVITY = [
  2,1,0,3,2,4,1, 2,3,1,0,2,3,2,
  4,2,3,1,2,0,1, 3,4,2,1,3,2,4,
  2,1,3,2,4,3,1, 0,2,3,4,2,1,3,
  2,3,4,1,2,3,2, 1,2,4,3,2,3,4,
  3,2,1,4,2,3,2, 4,3,2,1,3,4,2,
  2,3,4,3,2,1,2, 3,4,2,3,2,4,3,
  2,1,3,4,2,3,2, 1,3,2,4,3,2,3,
];

Object.assign(window, {
  ROVER, TROOPS, POST_TYPES, STATS, BADGES, POSTS, APPROVAL_QUEUE, DIRECTORY, ACTIVITY,
});
