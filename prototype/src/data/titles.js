// Fictional sample data for the prototype. In the real app this comes from GET /api/titles.
export const GENRES = ["Horror", "Comedy", "Sci-fi", "Fantasy", "Drama", "Musical", "Mystery", "Slice of life"];
export const FORMATS = ["Series", "Film", "Short"];
export const STATUSES = ["Ongoing", "Completed", "Hiatus"];

const ep = (name, minutes, unavailable = false) => ({ name, minutes, unavailable });

export const TITLES = [
  { id: 1, name: "Static Carnival", author: "Lantern Bay Studio", format: "Series", status: "Ongoing", year: 2024, genres: ["Horror", "Comedy"], tags: ["surreal", "dark comedy", "3D"], rating: 9.1, viewsM: 312, colors: ["#5b2a86", "#d6336c"], episodes: [ep("Pilot", 27), ep("Ring Two", 24), ep("Funhouse", 25), ep("Intermission", 22)] },
  { id: 2, name: "Paper Moth", author: "Iri Kessel", format: "Short", status: "Completed", year: 2023, genres: ["Fantasy", "Drama"], tags: ["2D", "hand-drawn", "no dialogue"], rating: 8.7, viewsM: 41, colors: ["#1f6f78", "#f3a712"], episodes: [ep("Paper Moth", 11)] },
  { id: 3, name: "Orbit Diner", author: "Grease Fire Animation", format: "Series", status: "Ongoing", year: 2022, genres: ["Sci-fi", "Comedy"], tags: ["space", "workplace", "2D"], rating: 8.2, viewsM: 96, colors: ["#2b3a67", "#4cc3cc"], episodes: [ep("Grand Opening", 18), ep("Zero-G Brunch", 17), ep("Health Inspector", 19), ep("Comet Rush", 18), ep("Closing Time", 21)] },
  { id: 4, name: "The Quiet Floor", author: "Hollow Mile", format: "Series", status: "Hiatus", year: 2021, genres: ["Horror", "Mystery"], tags: ["analog horror", "found footage"], rating: 8.9, viewsM: 150, colors: ["#3d3d3d", "#9c2c2c"], episodes: [ep("Tape 1", 9), ep("Tape 2", 12), ep("Tape 3", 10, true)] },
  { id: 5, name: "Songs for Small Dragons", author: "Mira & Co", format: "Film", status: "Completed", year: 2025, genres: ["Musical", "Fantasy"], tags: ["2D", "family", "musical"], rating: 8.4, viewsM: 22, colors: ["#b83b5e", "#f9ed69"], episodes: [ep("Full film", 58)] },
  { id: 6, name: "Laundromat at 3 AM", author: "Teo Varga", format: "Short", status: "Completed", year: 2024, genres: ["Slice of life", "Drama"], tags: ["lo-fi", "2D", "night"], rating: 7.9, viewsM: 8, colors: ["#22577a", "#80ed99"], episodes: [ep("Laundromat at 3 AM", 7)] },
  { id: 7, name: "Brass Hearts", author: "Cogwheel Collective", format: "Series", status: "Ongoing", year: 2023, genres: ["Sci-fi", "Drama"], tags: ["steampunk", "robots", "3D"], rating: 8.6, viewsM: 75, colors: ["#7b4b2a", "#e9b44c"], episodes: [ep("Wind-Up", 22), ep("Gearbox", 23), ep("Steam", 24)] },
  { id: 8, name: "Grim & Giggles", author: "Two Skulls", format: "Series", status: "Ongoing", year: 2025, genres: ["Comedy", "Horror"], tags: ["sketch", "2D", "dark comedy"], rating: 7.6, viewsM: 33, colors: ["#3c1642", "#f15bb5"], episodes: [ep("Bone Appetit", 6), ep("Crypt Keeper", 7), ep("Haunted Wi-Fi", 6)] },
  { id: 9, name: "Lighthouse Letters", author: "Ana Sol", format: "Short", status: "Completed", year: 2022, genres: ["Drama", "Mystery"], tags: ["2D", "watercolour"], rating: 8.8, viewsM: 19, colors: ["#0b525b", "#a8dadc"], episodes: [ep("Lighthouse Letters", 14)] },
  { id: 10, name: "Pixel Knights", author: "8th Bit Studio", format: "Series", status: "Completed", year: 2021, genres: ["Fantasy", "Comedy"], tags: ["pixel art", "adventure"], rating: 7.8, viewsM: 120, colors: ["#264653", "#e76f51"], episodes: [ep("Level 1", 15), ep("Level 2", 15), ep("Boss", 20)] },
  { id: 11, name: "Neon Tide", author: "Wavelength", format: "Film", status: "Completed", year: 2024, genres: ["Sci-fi", "Mystery"], tags: ["cyberpunk", "3D"], rating: 8.0, viewsM: 54, colors: ["#10002b", "#00b4d8"], episodes: [ep("Full film", 46)] },
  { id: 12, name: "Grandma's Robot", author: "Little Bolt", format: "Series", status: "Ongoing", year: 2025, genres: ["Slice of life", "Sci-fi", "Comedy"], tags: ["family", "2D", "robots"], rating: 8.3, viewsM: 12, colors: ["#ef476f", "#06d6a0"], episodes: [ep("Unboxing", 9), ep("Garden Day", 10)] },
];

export const findTitle = (id) => TITLES.find((t) => t.id === Number(id));
export const totalMinutes = (t) => t.episodes.reduce((sum, e) => sum + e.minutes, 0);

export const SAMPLE_REVIEWS = [
  { user: "moth_enjoyer", score: 9, text: "The pacing of the second episode is perfect, and the sound design carries the horror." },
  { user: "kz_anim_fan", score: 8, text: "Found it through the Horror + Comedy filter. Would never have seen it on my YouTube feed." },
];
