/* PIXEL WEATHER EARTH
   Data: Open-Meteo (free, no API key) -> temperature, wind speed/direction,
   precipitation, weather code, day/night. */

// ---------- 1. DATA ----------
const CITIES = [
  { n: "Toronto", lat: 43.65, lon: -79.38 },
  { n: "New York", lat: 40.71, lon: -74.0 },
  { n: "Mexico City", lat: 19.43, lon: -99.13 },
  { n: "Sao Paulo", lat: -23.55, lon: -46.63 },
  { n: "Reykjavik", lat: 64.15, lon: -21.94 },
  { n: "London", lat: 51.5, lon: -0.12 },
  { n: "Lagos", lat: 6.52, lon: 3.38 },
  { n: "Cape Town", lat: -33.92, lon: 18.42 },
  { n: "Cairo", lat: 30.04, lon: 31.24 },
  { n: "Moscow", lat: 55.75, lon: 37.62 },
  { n: "Dubai", lat: 25.2, lon: 55.27 },
  { n: "Mumbai", lat: 19.07, lon: 72.88 },
  { n: "Beijing", lat: 39.9, lon: 116.4 },
  { n: "Seoul", lat: 37.57, lon: 126.98 },
  { n: "Tokyo", lat: 35.68, lon: 139.69 },
  { n: "Sydney", lat: -33.87, lon: 151.21 },
];


// ---------- 1b. CITY DESCRIPTIONS + VIDEOS ----------
// video = the YouTube video ID (the part after "v=" in the link). Regular uploaded
// videos only, no livestreams. Leave "" to show a YouTube search link instead.
const CITY_INFO = {
  "Toronto": {
    street: "Yonge Street",
    video: "64Om0kLHs2w",
    desc: "Toronto is Canada's largest city, sitting on the northwest shore of Lake Ontario. It is known for the CN Tower, a very multicultural population, and long winters that swing to humid summers. Yonge Street runs north from the lakefront and is often called one of the longest streets in the world.",
  },
  "New York": {
    street: "Broadway and Times Square",
    video: "UXuPGXIxeJA",
    desc: "New York City is the most populous city in the United States, built around the harbor where the Hudson River meets the Atlantic. Its five boroughs hold world-famous theatres, museums and skyscrapers. Broadway cuts diagonally across the Manhattan grid and passes through Times Square.",
  },
  "Mexico City": {
    street: "Paseo de la Reforma",
    video: "xjR0q-yUsYY",
    desc: "Mexico City is the capital of Mexico and sits high up in a valley, at about 2,240 metres. It was built on the ruins of the Aztec city of Tenochtitlan and mixes colonial plazas, ancient sites and modern towers. Paseo de la Reforma is its grand boulevard, lined with monuments and skyscrapers.",
  },
  "Sao Paulo": {
    street: "Avenida Paulista",
    video: "-CgWfSxr624",
    desc: "Sao Paulo is Brazil's biggest city and one of the largest urban areas in the Southern Hemisphere. It is a financial hub with huge food, art and music scenes, shaped by immigrants from Italy, Japan, Lebanon and beyond. Avenida Paulista is its main avenue, closed to cars on Sundays.",
  },
  "Reykjavik": {
    street: "Laugavegur",
    video: "i3zIUltTNu0",
    desc: "Reykjavik is the capital of Iceland and the world's northernmost capital of a sovereign state. Heated by geothermal energy, it has colourful rooftops, very long summer days and dark winters where the northern lights can appear. Laugavegur is the main shopping street in the city centre.",
  },
  "London": {
    street: "Oxford Street",
    video: "6LaUvOLcicc",
    desc: "London is the capital of the United Kingdom and has been a major city for nearly two thousand years. It is famous for the Thames, Big Ben, Tower Bridge and its frequent rain. Oxford Street is one of the busiest shopping streets in Europe.",
  },
  "Lagos": {
    street: "Victoria Island and Lekki",
    video: "LZJ000F-CLc",
    desc: "Lagos is Nigeria's largest city and one of the fastest growing cities in Africa. It is a busy port with a lively music, film and nightlife culture, and a warm, humid climate all year. Its streets are known for their energy and constant movement.",
  },
  "Cape Town": {
    street: "Long Street",
    video: "BSxV9nUfDAU",
    desc: "Cape Town sits at the southwestern tip of South Africa, below the flat-topped Table Mountain. It has beaches, vineyards and a long, complicated history, and its weather can change quickly with the wind. Long Street in the city centre is known for its Victorian buildings, bars and bookshops.",
  },
  "Cairo": {
    street: "Tahrir Square and the Nile Corniche",
    video: "S9DIgNZTnkY",
    desc: "Cairo is the capital of Egypt and sits on the Nile, close to the pyramids of Giza. It is one of the largest cities in Africa and the Middle East, with a hot, dry desert climate. Its streets mix ancient history, markets, traffic and constant noise.",
  },
  "Moscow": {
    street: "Tverskaya Street",
    video: "YJhsji6usQI",
    desc: "Moscow is the capital of Russia and its largest city, with the Kremlin and Red Square at its centre. Winters are long and snowy while summers are warm. Tverskaya Street is its main avenue, running north from the Kremlin area.",
  },
  "Dubai": {
    street: "Sheikh Zayed Road",
    video: "AjwcqYZ6cIw",
    desc: "Dubai is in the United Arab Emirates, on the Persian Gulf, and grew from a small trading port into a city of record-breaking towers. The Burj Khalifa is the tallest building in the world. Summers are extremely hot, so much of city life moves indoors or to the evening.",
  },
  "Mumbai": {
    street: "Marine Drive",
    video: "-OBxM3WqiNs",
    desc: "Mumbai is India's financial capital and the home of Bollywood, built on a group of islands on the Arabian Sea. It is crowded, fast and humid, with a heavy monsoon season from June to September. Marine Drive curves along the sea and is a favourite place to walk at sunset.",
  },
  "Beijing": {
    street: "Wangfujing Street",
    video: "2Mbg4E_JVaI",
    desc: "Beijing is the capital of China and has been a political centre for over 800 years. It is home to the Forbidden City, Tiananmen Square and parts of the Great Wall nearby. Winters are cold and dry, and summers are hot with heavy rain. Wangfujing is a famous pedestrian shopping street.",
  },
  "Seoul": {
    street: "Myeongdong",
    video: "kZDmkmuForQ",
    desc: "Seoul is the capital of South Korea and is split by the Han River, with mountains on all sides. It blends old palaces and temples with neon streets, cafes and fast technology. Myeongdong is a busy shopping and street food district in the city centre.",
  },
  "Tokyo": {
    street: "Shibuya Crossing",
    video: "28ZjrtD_iL0",
    desc: "Tokyo is the capital of Japan and the centre of the world's largest metropolitan area. It mixes quiet shrines and gardens with bright neon districts and an extremely punctual train network. Shibuya Crossing is one of the busiest pedestrian crossings in the world.",
  },
  "Sydney": {
    street: "George Street",
    video: "HRg1gJi6yqc",
    desc: "Sydney is Australia's largest city, built around a huge natural harbour and known for the Opera House and the Harbour Bridge. It has a mild climate, surf beaches and a relaxed outdoor lifestyle. George Street is the oldest street in the country and runs through the city centre.",
  },
};

const FIELDS = [
  "temperature_2m", "wind_speed_10m", "wind_direction_10m",
  "precipitation", "weather_code", "is_day",
];

const API =
  "https://api.open-meteo.com/v1/forecast?latitude=" +
  CITIES.map((c) => c.lat).join(",") +
  "&longitude=" +
  CITIES.map((c) => c.lon).join(",") +
  "&current=" + FIELDS.join(",") + "&timezone=auto";

const status = document.getElementById("status");
const refreshBtn = document.getElementById("refreshBtn");
const cityList = document.getElementById("cityList");
const motion = matchMedia("(prefers-reduced-motion: reduce)");
let weather = [];
let lastRefresh = "";
let refreshing = false;

const cityButtons = CITIES.map((city, i) => {
  const button = document.createElement("button");
  const name = document.createElement("span");
  const value = document.createElement("span");
  button.type = "button";
  button.disabled = true;
  name.textContent = city.n;
  value.className = "city-temp";
  value.textContent = "—";
  button.append(name, value);
  button.addEventListener("click", () => openCity(i));
  button.addEventListener("pointerenter", (e) => {
    if (e.pointerType !== "touch") listHover = i;
  });
  button.addEventListener("pointerleave", () => { listHover = -1; });
  button.addEventListener("focus", () => { listFocus = i; });
  button.addEventListener("blur", () => { listFocus = -1; });
  cityList.append(button);
  return button;
});

function updateCityList() {
  cityButtons.forEach((button, i) => {
    const w = weather[i];
    button.disabled = !w;
    if (!w) return;
    const value = button.lastElementChild;
    value.textContent = showTemp(w.temperature_2m);
    value.style.setProperty("--city-temp", css(palette(w.temperature_2m, true).acc));
  });
}

function setStatus(state, message) {
  status.dataset.state = state;
  status.textContent = message;
}

async function loadWeather() {
  if (refreshing) return;
  refreshing = true;
  refreshBtn.setAttribute("aria-disabled", "true");
  setStatus("loading", lastRefresh ? "Checking for new data…" : "Connecting to Open-Meteo…");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(API, { cache: "no-store", signal: controller.signal });
    if (!res.ok) throw new Error("Weather request failed");
    const list = await res.json();
    if (!Array.isArray(list) || list.length !== CITIES.length) throw new Error("Incomplete city data");
    const next = list.map((entry) => entry?.current);
    if (next.some((w) => !w || !FIELDS.every((key) => Number.isFinite(w[key])) ||
      typeof w.time !== "string" || !Number.isFinite(w.interval))) {
      throw new Error("Invalid weather values");
    }
    weather = next;
    lastRefresh = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setStatus("live", "Live feed · fetched " + lastRefresh);
    updateCityList();
    if (view === "city") {
      buildScene();
      updateHud();
      audioUpdate();
    }
  } catch {
    setStatus("error", lastRefresh
      ? "Refresh failed · showing data fetched " + lastRefresh
      : "Weather unavailable · try Refresh");
  } finally {
    clearTimeout(timeout);
    refreshing = false;
    refreshBtn.removeAttribute("aria-disabled");
  }
}

// ---------- 2. HELPERS ----------
const lerp = (a, b, t) => a + (b - a) * t;
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => a.map((v, i) => Math.round(lerp(v, b[i], t)));
const css = (c) => `rgb(${c[0]},${c[1]},${c[2]})`;

// Temperature -> colour palette: [temp, sky top, sky bottom, ground, accent]
const STOPS = [
  [-15, "#dff3ff", "#9fd0f0", "#5b7fa8", "#ffffff"],
  [0, "#7fb7e6", "#3f6fb5", "#2c4a7a", "#cfefff"],
  [10, "#4fa3b8", "#2c7f8f", "#1d5058", "#9af0d0"],
  [20, "#f2d27a", "#e89a5a", "#7a4a3a", "#ffe08a"],
  [30, "#f08a4b", "#d9482b", "#5a2330", "#ffd23f"],
  [40, "#d9302b", "#7a0f2a", "#35101f", "#ff7a3d"],
].map((s) => [s[0], hex(s[1]), hex(s[2]), hex(s[3]), hex(s[4])]);

function palette(temp, isDay) {
  temp = Math.max(-15, Math.min(40, temp));
  let i = 0;
  while (i < STOPS.length - 2 && temp > STOPS[i + 1][0]) i++;
  const a = STOPS[i], b = STOPS[i + 1];
  const t = (temp - a[0]) / (b[0] - a[0]);
  const p = { top: mix(a[1], b[1], t), bot: mix(a[2], b[2], t), gnd: mix(a[3], b[3], t), acc: mix(a[4], b[4], t) };
  if (!isDay) {
    const night = [10, 12, 40];
    p.top = mix(p.top, night, 0.8);
    p.bot = mix(p.bot, night, 0.65);
    p.gnd = mix(p.gnd, night, 0.55);
  }
  return p;
}

function kindOf(code) {
  if (code >= 95) return "storm";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if (code === 45 || code === 48) return "fog";
  if (code <= 1) return "clear";
  return "cloud";
}
const LABEL = { clear: "Clear skies", cloud: "Cloudy", rain: "Rain", snow: "Snow", storm: "Thunderstorm", fog: "Fog" };

let useF = false;
const showTemp = (c) => (useF ? Math.round((c * 9) / 5 + 32) + "°F" : Math.round(c) + "°C");

// ---------- 3. THE PIXEL GLOBE ----------
// Very rough land map: latitude row -> [lon start, lon end] spans
const LAND = {
  80: [[-110, -90], [-70, -20]],
  75: [[-125, -80], [-70, -20], [55, 65], [95, 115], [135, 145]],
  70: [[-180, -170], [-165, -95], [-60, -22], [5, 180]],
  65: [[-180, -170], [-170, -62], [-55, -22], [-24, -14], [10, 180]],
  60: [[-165, -95], [-78, -58], [-50, -42], [5, 180]],
  55: [[-130, -55], [-8, 0], [8, 180]],
  50: [[-128, -55], [-10, 2], [-5, 140], [142, 145], [155, 165]],
  45: [[-125, -60], [-2, 28], [40, 48], [52, 145]],
  40: [[-125, -70], [-9, 3], [8, 18], [20, 25], [26, 48], [54, 122], [124, 130], [135, 142]],
  35: [[-122, -76], [-9, 11], [26, 122], [126, 130], [131, 141]],
  30: [[-118, -80], [-10, 33], [36, 48], [50, 122], [129, 135]],
  25: [[-112, -97], [-83, -79], [-17, 33], [37, 56], [57, 122]],
  20: [[-105, -87], [-85, -75], [-17, 37], [38, 58], [70, 88], [92, 117], [120, 123]],
  15: [[-92, -84], [-17, 40], [42, 53], [73, 80], [98, 109], [121, 125]],
  10: [[-84, -62], [-15, 51], [76, 81], [99, 109], [121, 127]],
  5: [[-78, -52], [-12, 48], [95, 98], [100, 104], [110, 119], [122, 127]],
  0: [[-80, -50], [9, 42], [99, 104], [110, 118], [120, 125], [133, 142]],
  "-5": [[-80, -35], [12, 40], [102, 106], [110, 116], [120, 123], [133, 150]],
  "-10": [[-78, -36], [13, 40], [105, 115], [120, 127], [131, 150]],
  "-15": [[-75, -40], [12, 40], [44, 50], [125, 136], [141, 145]],
  "-20": [[-70, -40], [12, 36], [43, 50], [115, 150]],
  "-25": [[-70, -48], [14, 35], [44, 47], [114, 153]],
  "-30": [[-71, -50], [16, 32], [115, 153]],
  "-35": [[-72, -58], [18, 27], [116, 151], [172, 178]],
  "-40": [[-73, -62], [144, 148], [172, 178]],
  "-45": [[-74, -65], [167, 172]],
  "-50": [[-74, -68]],
  "-55": [[-70, -66]],
  "-65": [[-65, -55]],
  "-70": [[-180, 180]],
  "-75": [[-180, 180]],
  "-80": [[-180, 180]],
  "-85": [[-180, 180]],
};

function isLand(lat, lon) {
  const row = LAND[Math.round(lat / 5) * 5];
  if (!row) return false;
  for (const s of row) if (lon >= s[0] && lon <= s[1]) return true;
  return false;
}

const gcanvas = document.getElementById("globe");
const gctx = gcanvas.getContext("2d");
const SIZE = 96, R = 46, TILT = (20 * Math.PI) / 180;
let rotLon = -38, activePointer = null, moved = 0, cityPos = [];
let pinHover = -1, listHover = -1, listFocus = -1;

function drawPin(i, x, y) {
  const w = weather[i];
  gctx.fillStyle = "#000";
  gctx.fillRect(x - 2, y - 2, 5, 5);
  gctx.fillStyle = w ? css(palette(w.temperature_2m, 1).acc) : "#fff";
  gctx.fillRect(x - 1, y - 1, 3, 3);
}

function drawGlobe(highlight) {
  const img = gctx.createImageData(SIZE, SIZE);
  const d = img.data, ct = Math.cos(TILT), st = Math.sin(TILT);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const px = (x + 0.5 - SIZE / 2) / R, py = (SIZE / 2 - y - 0.5) / R;
      const r2 = px * px + py * py;
      if (r2 > 1) continue;
      const z = Math.sqrt(1 - r2);
      const yy = py * ct + z * st, zz = z * ct - py * st;
      const lat = (Math.asin(yy) * 180) / Math.PI;
      let lon = (Math.atan2(px, zz) * 180) / Math.PI + rotLon;
      lon = ((((lon + 180) % 360) + 360) % 360) - 180;
      const chk = (x + y) % 2;
      let c;
      if (isLand(lat, lon)) c = Math.abs(lat) > 68 ? [235, 245, 255] : chk && z < 0.9 ? [52, 140, 70] : [66, 166, 84];
      else c = chk ? [30, 70, 140] : [36, 82, 158];
      const shade = z > 0.75 ? 1 : z > 0.45 ? 0.8 : 0.6; // 3 pixel-style light steps
      const i = (y * SIZE + x) * 4;
      d[i] = c[0] * shade; d[i + 1] = c[1] * shade; d[i + 2] = c[2] * shade; d[i + 3] = 255;
    }
  }
  gctx.putImageData(img, 0, 0);

  // city dots, coloured by live temperature
  cityPos = [];
  CITIES.forEach((c, i) => {
    const dl = ((c.lon - rotLon) * Math.PI) / 180, la = (c.lat * Math.PI) / 180;
    const x = Math.cos(la) * Math.sin(dl), yy = Math.sin(la), zz = Math.cos(la) * Math.cos(dl);
    const py = yy * ct - zz * st, z = yy * st + zz * ct;
    if (z <= 0.05) { cityPos[i] = null; return; }
    const sx = Math.round(SIZE / 2 + x * R), sy = Math.round(SIZE / 2 - py * R);
    cityPos[i] = [sx, sy];
    if (i !== highlight) drawPin(i, sx, sy);
  });

  // Draw the selected pin last so neighbouring pins cannot cover it.
  const pin = cityPos[highlight];
  if (pin) {
    const [x, y] = pin;
    drawPin(highlight, x, y);
    gctx.strokeStyle = "#fff";
    gctx.strokeRect(x - 3.5, y - 3.5, 7, 7);
  }
}

function nearestCity(e) {
  const r = gcanvas.getBoundingClientRect();
  const mx = ((e.clientX - r.left) / r.width) * SIZE, my = ((e.clientY - r.top) / r.height) * SIZE;
  let best = -1, bd = 36; // 6px radius
  cityPos.forEach((p, i) => {
    if (!p) return;
    const dd = (p[0] - mx) ** 2 + (p[1] - my) ** 2;
    if (dd < bd) { bd = dd; best = i; }
  });
  return best;
}

const tip = document.getElementById("tip");
function setPinHover(i) {
  if (i !== pinHover) {
    cityButtons[pinHover]?.classList.remove("pin-highlight");
    cityButtons[i]?.classList.add("pin-highlight");
    pinHover = i;
  }
  tip.hidden = i < 0;
}

let lastX = 0, lastY = 0;
gcanvas.addEventListener("pointerdown", (e) => {
  if (activePointer !== null || e.button !== 0) return;
  activePointer = e.pointerId;
  moved = 0;
  lastX = e.clientX;
  lastY = e.clientY;
  setPinHover(-1);
  gcanvas.setPointerCapture(e.pointerId);
});
gcanvas.addEventListener("pointermove", (e) => {
  if (activePointer === e.pointerId) {
    const dx = e.clientX - lastX;
    moved += Math.hypot(dx, e.clientY - lastY);
    lastX = e.clientX;
    lastY = e.clientY;
    rotLon = (rotLon - (dx / gcanvas.getBoundingClientRect().width) * 160) % 360;
    return;
  }
  if (activePointer !== null || e.pointerType === "touch") return;
  setPinHover(nearestCity(e));
  if (pinHover < 0) return;
  const w = weather[pinHover];
  tip.textContent = CITIES[pinHover].n + (w ? " · " + showTemp(w.temperature_2m) : "");
  tip.style.left = Math.max(0, Math.min(e.clientX + 14, innerWidth - tip.offsetWidth - 8)) + "px";
  tip.style.top = Math.max(0, Math.min(e.clientY + 14, innerHeight - tip.offsetHeight - 8)) + "px";
});
gcanvas.addEventListener("pointerup", (e) => {
  if (activePointer !== e.pointerId) return;
  activePointer = null;
  if (moved < 6) openCity(nearestCity(e));
});
gcanvas.addEventListener("lostpointercapture", (e) => {
  if (activePointer === e.pointerId) activePointer = null;
});
gcanvas.addEventListener("pointerleave", () => setPinHover(-1));

// ---------- 4. CITY SCENE ----------
const scene = document.getElementById("scene");
const sctx = scene.getContext("2d");
const bg = document.createElement("canvas");
const bctx = bg.getContext("2d");
let view = "globe", cur = 0, W = 160, H = 100, sc = {}, parts = [], clouds = [], stars = [];

function sizeScene() {
  H = 100;
  W = Math.max(1, Math.round((H * scene.clientWidth) / scene.clientHeight));
  scene.width = bg.width = W;
  scene.height = bg.height = H;
  sctx.imageSmoothingEnabled = false;
}

function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) / 2147483647); }

function buildScene() {
  const w = weather[cur];
  if (!w) return;
  sizeScene();
  const r = rng(cur * 97 + 13);
  const windowRandom = rng(cur * 131 + 31);
  sc = {
    temp: w.temperature_2m, wind: w.wind_speed_10m, precip: w.precipitation,
    kind: kindOf(w.weather_code), day: !!w.is_day,
  };
  sc.pal = palette(sc.temp, sc.day);
  // wind: speed + direction drive particle drift
  sc.vx = Math.max(-4, Math.min(4, -Math.sin((w.wind_direction_10m * Math.PI) / 180) * sc.wind * 0.06));
  document.getElementById("cityView").style.setProperty("--acc", css(sc.pal.acc));

  // sky: dithered colour bands
  const N = 8, bands = [];
  for (let i = 0; i < N; i++) bands.push(mix(sc.pal.top, sc.pal.bot, i / (N - 1)));
  const img = bctx.createImageData(W, H), d = img.data;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const v = Math.min(1, y / (H * 0.8)) * (N - 1) + ((x + y) % 2 ? 0.3 : -0.3);
    const c = bands[Math.max(0, Math.min(N - 1, Math.round(v)))];
    const i = (y * W + x) * 4;
    d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255;
  }
  bctx.putImageData(img, 0, 0);

  // skyline
  const bcol = mix(sc.pal.gnd, [0, 0, 0], 0.35);
  for (let x = 0; x < W; ) {
    const bw = 8 + Math.floor(r() * 9), bh = 15 + Math.floor(r() * 30);
    bctx.fillStyle = css(bcol);
    bctx.fillRect(x, H - bh, bw, bh);
    for (let wy = H - bh + 3; wy < H - 6; wy += 4) for (let wx = x + 2; wx < x + bw - 2; wx += 3) {
      if (!sc.day && windowRandom() > 0.45) { bctx.fillStyle = "#ffe08a"; bctx.fillRect(wx, wy, 1, 2); }
      else if (sc.day && windowRandom() > 0.8) { bctx.fillStyle = css(mix(bcol, [255, 255, 255], 0.25)); bctx.fillRect(wx, wy, 1, 2); }
    }
    x += bw + 1;
  }
  bctx.fillStyle = css(sc.pal.gnd);
  bctx.fillRect(0, H - 6, W, 6);

  // particles: type depends on weather, count on precipitation
  const k = sc.kind;
  const wetCount = Math.min(260, 60 + sc.precip * 40);
  const n = k === "storm" ? Math.min(300, wetCount + 80) : k === "rain" ? wetCount : k === "snow" ? wetCount : k === "clear" ? 40 : k === "cloud" ? 25 : 0;
  parts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, s: Math.random() }));
  const nc = { clear: 1, cloud: 5, rain: 7, storm: 8, snow: 6, fog: 3 }[k];
  clouds = Array.from({ length: nc }, () => ({ x: Math.random() * W, y: 4 + Math.random() * 35, w: 16 + Math.random() * 16, s: 0.6 + Math.random() }));
  stars = Array.from({ length: 40 }, () => ({ x: Math.random() * W, y: Math.random() * H * 0.5, p: Math.random() * 6 }));
}

function drawScene(t, step) {
  sctx.drawImage(bg, 0, 0);
  const k = sc.kind, p = sc.pal;

  // stars (night, no heavy cloud) / sun / moon
  if (!sc.day && (k === "clear" || k === "cloud" || k === "snow")) {
    stars.forEach((s) => { sctx.fillStyle = Math.sin(t / 300 + s.p) > 0 ? "#fff" : "#667"; sctx.fillRect(s.x | 0, s.y | 0, 1, 1); });
  }
  if (k === "clear" || k === "cloud") {
    const cx = (W * 0.78) | 0, cy = 22;
    if (sc.day) {
      const pulse = Math.floor((t / 400) % 2);
      sctx.fillStyle = css(p.acc);
      for (let yy = -8; yy <= 8; yy++) for (let xx = -8; xx <= 8; xx++) {
        const dd = xx * xx + yy * yy;
        if (dd <= 36 || (dd <= 64 + pulse * 10 && dd > 50 && (xx + yy) % 2 === 0)) sctx.fillRect(cx + xx, cy + yy, 1, 1);
      }
    } else {
      sctx.fillStyle = "#f4f1d0";
      for (let yy = -6; yy <= 6; yy++) for (let xx = -6; xx <= 6; xx++) {
        const a = xx * xx + yy * yy <= 36, b = (xx - 3) ** 2 + (yy + 2) ** 2 <= 30;
        if (a && !b) sctx.fillRect(cx + xx, cy + yy, 1, 1);
      }
    }
  }

  // clouds drift with wind
  const heavy = k === "rain" || k === "storm";
  const cc = mix(sc.day ? [255, 255, 255] : [150, 150, 180], [90, 95, 110], heavy ? 0.7 : 0);
  sctx.fillStyle = css(cc);
  clouds.forEach((c) => {
    c.x += (sc.vx * 0.12 * c.s + 0.03) * step;
    if (c.x > W + 10) c.x = -c.w; if (c.x < -c.w - 10) c.x = W;
    const x = c.x | 0, y = c.y | 0, w = c.w | 0;
    sctx.fillRect(x + 3, y, w - 6, 3); sctx.fillRect(x, y + 3, w, 4); sctx.fillRect(x + 2, y + 7, w - 4, 2);
  });

  // fog
  if (k === "fog") {
    sctx.fillStyle = "rgba(220,225,230,0.45)"; sctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 4; i++) { sctx.fillStyle = "rgba(255,255,255,0.15)"; sctx.fillRect(((t / 60 + i * 50) % (W + 40)) - 40, 30 + i * 15, 40, 4); }
  }

  // particles: wind drives their motion
  parts.forEach((q) => {
    if (k === "rain" || k === "storm") {
      q.y += (2.2 + q.s * 1.5) * step; q.x += sc.vx * step;
      sctx.fillStyle = "#9fd0f0"; sctx.fillRect(q.x | 0, q.y | 0, 1, 3);
    } else if (k === "snow") {
      q.y += (0.3 + q.s * 0.4) * step; q.x += (sc.vx * 0.4 + Math.sin(t / 500 + q.s * 10) * 0.15) * step;
      sctx.fillStyle = "#fff"; sctx.fillRect(q.x | 0, q.y | 0, q.s > 0.6 ? 2 : 1, q.s > 0.6 ? 2 : 1);
    } else {
      // clear / cloudy: floating sparkles in the accent colour
      q.y -= (0.08 + q.s * 0.08) * step; q.x += (sc.vx * 0.3 + 0.03) * step;
      sctx.fillStyle = Math.sin(t / 250 + q.s * 20) > 0 ? css(p.acc) : "rgba(255,255,255,0.3)";
      sctx.fillRect(q.x | 0, q.y | 0, 1, 1);
    }
    if (q.y > H) { q.y = -3; q.x = Math.random() * W; }
    if (q.y < -3) q.y = H;
    if (q.x > W) q.x = 0; if (q.x < 0) q.x = W;
  });

  // texture: scanlines on wet / gloomy weather, clean on clear weather
  if (k !== "clear") {
    sctx.fillStyle = "rgba(0,0,0,0.12)";
    for (let y = 0; y < H; y += 2) sctx.fillRect(0, y, W, 1);
  }

}

const globeView = document.getElementById("globeView");
const cityView = document.getElementById("cityView");
const cityName = document.getElementById("cityName");
const celsiusBtn = document.getElementById("celsiusBtn");
const fahrenheitBtn = document.getElementById("fahrenheitBtn");
const soundBtn = document.getElementById("soundBtn");
const soundStatus = document.getElementById("soundStatus");
const EFFECT = {
  clear: "Scattered sparks",
  cloud: "More cloud cover",
  rain: "Rain streak density",
  snow: "Snowflake density",
  storm: "Storm streak density",
  fog: "Haze over the skyline",
};

function updateSceneKey(w, kind, direction) {
  const hasPrecipitation = kind === "rain" || kind === "snow" || kind === "storm";
  document.getElementById("sceneTemp").textContent = "Temperature · " + showTemp(w.temperature_2m);
  document.getElementById("sceneWeather").textContent = hasPrecipitation
    ? LABEL[kind] + " · " + w.precipitation + " mm"
    : "Weather · " + LABEL[kind];
  document.getElementById("sceneWeatherEffect").textContent = EFFECT[kind];
  document.getElementById("sceneWindKey").hidden = kind === "fog";
  document.getElementById("sceneWind").textContent = "Wind · " + direction + " " + Math.round(sc.wind) + " km/h";
  const drift = Math.abs(sc.vx) < 0.05 ? "Little sideways drift" : sc.vx > 0 ? "Pushes particles right" : "Pushes particles left";
  document.getElementById("sceneWindEffect").textContent = motion.matches ? "Drift paused by motion setting" : drift;
  document.getElementById("sceneLight").textContent = w.is_day ? "Light · Day" : "Light · Night";
  document.getElementById("sceneLightEffect").textContent = w.is_day ? "Brighter sky" : "Darker sky, lit windows";
}

function updateHud() {
  const w = weather[cur];
  const kind = kindOf(w.weather_code);
  const compass = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const direction = compass[Math.round(w.wind_direction_10m / 45) % 8];
  cityName.textContent = CITIES[cur].n;
  document.getElementById("temp").textContent = showTemp(w.temperature_2m);
  document.getElementById("cond").textContent = LABEL[kind] + (w.is_day ? " · Day" : " · Night");
  document.getElementById("wind").textContent = Math.round(w.wind_speed_10m) + " km/h " + direction;
  document.getElementById("precip").textContent = w.precipitation + " mm / " + w.interval / 60 + " min";
  document.getElementById("localTime").textContent = w.time.replace("T", " ");
  updateSceneKey(w, kind, direction);
}

function openCity(i) {
  if (!weather[i]) return;
  cur = i;
  view = "city";
  globeView.classList.remove("active");
  cityView.classList.add("active");
  setPinHover(-1);
  listHover = -1;
  buildScene();
  updateHud();
  audioUpdate();
  window.scrollTo(0, 0);
  cityName.focus({ preventScroll: true });
}

function backToGlobe() {
  view = "globe";
  cityView.classList.remove("active");
  globeView.classList.add("active");
  audioUpdate();
  cityButtons[cur].focus();
}


// ---------- 4b. ABOUT VIEW (description + embedded video) ----------
const aboutView = document.getElementById("aboutView");
const aboutName = document.getElementById("aboutName");
const videoFrame = document.getElementById("videoFrame");
const videoNote = document.getElementById("videoNote");
const videoLink = document.getElementById("videoLink");
let ytPlayer = null, ytApiPromise = null, videoTimer = 0;

function loadYouTubeApi() {
  if (window.YT && YT.Player) return Promise.resolve();
  if (!ytApiPromise) {
    ytApiPromise = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { if (previous) previous(); resolve(); };
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.onerror = () => { ytApiPromise = null; reject(new Error("YouTube API blocked")); };
      document.head.append(tag);
    });
  }
  return ytApiPromise;
}

function stopVideo() {
  clearTimeout(videoTimer);
  if (ytPlayer && ytPlayer.destroy) { try { ytPlayer.destroy(); } catch {} }
  ytPlayer = null;
  videoFrame.replaceChildren();
}

// Shown when the embed cannot play (no video set, blocked embed, offline, or the page
// was opened by double-clicking the file instead of from a web address).
function showVideoFallback(message) {
  clearTimeout(videoTimer);
  videoNote.textContent = message;
}

function playVideo(info) {
  stopVideo();
  videoNote.textContent = "";
  const searchUrl = "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(info.street + " walking tour 4K");
  if (!info.video) {
    videoLink.href = searchUrl;
    videoLink.textContent = "Search street walks on YouTube";
    showVideoFallback("No embedded video has been chosen for this city yet.");
    return;
  }
  videoLink.href = "https://www.youtube.com/watch?v=" + info.video;
  videoLink.textContent = "Watch on YouTube";
  const target = document.createElement("div");
  target.id = "ytPlayer";
  videoFrame.append(target);
  videoNote.textContent = "Loading video…";
  const fail = () => showVideoFallback("The video could not be played here. Use the link below to watch it on YouTube.");
  // If nothing has loaded after 8 seconds, show the fallback message.
  videoTimer = setTimeout(fail, 8000);
  loadYouTubeApi().then(() => {
    if (view !== "about") return;
    ytPlayer = new YT.Player("ytPlayer", {
      videoId: info.video,
      width: "100%",
      height: "100%",
      playerVars: { autoplay: 1, mute: 1, rel: 0, playsinline: 1, modestbranding: 1 },
      events: {
        onReady: (e) => { clearTimeout(videoTimer); videoNote.textContent = ""; e.target.mute(); e.target.playVideo(); },
        onError: fail,
      },
    });
  }).catch(fail);
}

function openAbout() {
  const city = CITIES[cur].n;
  const info = CITY_INFO[city] || { street: city, video: "", desc: "" };
  view = "about";
  cityView.classList.remove("active");
  aboutView.classList.add("active");
  aboutName.textContent = city;
  document.getElementById("aboutDesc").textContent = info.desc;
  document.getElementById("aboutStreet").textContent = "Featured street: " + info.street;
  audioUpdate(); // weather sound pauses so it does not clash with the video
  window.scrollTo(0, 0);
  aboutName.focus({ preventScroll: true });
  playVideo(info);
}

function backToCity() {
  stopVideo();
  view = "city";
  aboutView.classList.remove("active");
  cityView.classList.add("active");
  buildScene();
  audioUpdate();
  document.getElementById("aboutBtn").focus();
}

document.getElementById("aboutBtn").addEventListener("click", openAbout);
document.getElementById("aboutBackBtn").addEventListener("click", backToCity);

// ---------- 5. SOUND (Web Audio) ----------
// Rain and wind are synthesized from filtered noise.
let ac, rainG, windG, windF, lfoG, soundOn = false;

function initAudio() {
  ac = new (window.AudioContext || window.webkitAudioContext)();
  const buf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate), data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const noise = () => { const s = ac.createBufferSource(); s.buffer = buf; s.loop = true; s.start(); return s; };
  const rf = ac.createBiquadFilter(); rf.type = "bandpass"; rf.frequency.value = 3500;
  rainG = ac.createGain(); rainG.gain.value = 0;
  noise().connect(rf); rf.connect(rainG); rainG.connect(ac.destination);
  windF = ac.createBiquadFilter(); windF.type = "lowpass";
  windG = ac.createGain(); windG.gain.value = 0;
  noise().connect(windF); windF.connect(windG); windG.connect(ac.destination);
  const lfo = ac.createOscillator(); lfo.frequency.value = 0.15;
  lfoG = ac.createGain(); lfoG.gain.value = 0;
  lfo.connect(lfoG); lfoG.connect(windG.gain); lfo.start();
}

function audioUpdate() {
  const on = soundOn && view === "city";
  soundBtn.setAttribute("aria-pressed", String(soundOn));
  soundStatus.textContent = on
    ? "Sound on · Wind shapes the ambience. Rain adds a second layer."
    : "Sound off. Enable it to hear the weather.";
  if (!ac) return;
  const wet = sc.kind === "rain" || sc.kind === "storm";
  const base = on ? Math.min(0.24, sc.wind / 100) : 0;
  rainG.gain.setTargetAtTime(on && wet ? Math.min(0.25, 0.06 + sc.precip * 0.08) : 0, ac.currentTime, 0.2);
  windG.gain.setTargetAtTime(base, ac.currentTime, 0.2);
  lfoG.gain.setTargetAtTime(base * 0.35, ac.currentTime, 0.2);
  if (on) windF.frequency.value = 300 + sc.wind * 12;
}

// ---------- 6. BUTTONS + MAIN LOOP ----------
document.getElementById("backBtn").addEventListener("click", backToGlobe);
refreshBtn.addEventListener("click", loadWeather);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && view === "city") backToGlobe();
  else if (e.key === "Escape" && view === "about") backToCity();
});
function setTemperatureUnit(fahrenheit) {
  if (useF === fahrenheit) return;
  useF = fahrenheit;
  celsiusBtn.setAttribute("aria-pressed", String(!useF));
  fahrenheitBtn.setAttribute("aria-pressed", String(useF));
  updateCityList();
  if (view === "city") updateHud();
}
celsiusBtn.addEventListener("click", () => setTemperatureUnit(false));
fahrenheitBtn.addEventListener("click", () => setTemperatureUnit(true));
soundBtn.addEventListener("click", async () => {
  soundBtn.disabled = true;
  try {
    if (!soundOn) {
      if (!ac) initAudio();
      if (ac.state !== "running") await ac.resume();
    }
    soundOn = !soundOn;
    audioUpdate();
  } catch {
    soundStatus.textContent = "This browser could not start weather audio.";
  } finally {
    soundBtn.disabled = false;
  }
});
new ResizeObserver(() => { if (view === "city") buildScene(); }).observe(scene);
motion.addEventListener("change", () => { if (view === "city") updateHud(); });

let previousFrame = 0;
function loop(t) {
  const step = motion.matches ? 0 : Math.min(2, (t - previousFrame) / (1000 / 60));
  previousFrame = t;
  if (view === "globe") {
    const listHighlight = listHover >= 0 ? listHover : listFocus;
    const highlight = pinHover >= 0 ? pinHover : listHighlight;
    if (activePointer === null && highlight < 0) rotLon = (rotLon + 0.15 * step) % 360;
    drawGlobe(highlight);
  } else if (view === "city" && sc.pal) {
    drawScene(motion.matches ? 0 : t, step);
  }
  requestAnimationFrame(loop);
}

loadWeather();
setInterval(loadWeather, 10 * 60 * 1000); // refresh every 10 minutes
requestAnimationFrame(loop);
