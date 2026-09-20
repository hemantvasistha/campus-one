/* CAMPUS ONE — frontend-only experience
   Vanilla JS + localStorage. No backend required.
*/
const D = CAMPUS_ONE_DATA;
const SD = CAMPUS_ONE_SYLLABUS;
const app = document.getElementById("app");

const ROUTES = {
  "": renderHome, home: renderHome, timetable: renderTimetable, bus: renderBus,
  canteen: renderCanteen, map: renderMap, syllabus: renderSyllabus,
  notes: () => renderPlaceholder(
    "Notes", "Semester-wise Notes (Semester → Subject → Unit → Resource) is ready to receive files once shared by faculty."
  ),
  library: () => renderPlaceholder(
    "Library", "Timings, rules and catalogue will appear here as soon as the library office shares them."
  ),
  ai: renderAI, login: renderLogin, credits: renderCredits
};

let currentUser = null;
try { currentUser = JSON.parse(localStorage.getItem("campus_one_user") || "null"); }
catch { localStorage.removeItem("campus_one_user"); }
let activeSection = "A1";
let clockTimer = null;

function navigate() {
  const hash = location.hash.replace("#/", "").replace("#", "");
  const route = ROUTES[hash] || renderNotFound;
  app.innerHTML = "";
  try {
    const node = route();
    if (node) app.appendChild(node);
  } catch (error) {
    console.error(error);
    app.appendChild(el("section", { class: "section" },
      el("div", { class: "container" }, el("div", { class: "note-box error-box" },
        error.message || "Unable to load this page."
      ))
    ));
  }
  highlightNav(hash);
  document.getElementById("nav-links")?.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "auto" });
}

function highlightNav(hash) {
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("data-route") === (hash || "home"));
  });
}

function el(tag, attrs = {}, children = []) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (v === null || v === undefined) return;
    if (k === "class") e.className = v;
    else if (k === "text") e.textContent = v;
    else if (k === "html") e.innerHTML = v;
    else if (k === "style") e.setAttribute("style", v);
    else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  });
  const appendChildSafe = (child) => {
    if (child === null || child === undefined || child === false) return;
    if (Array.isArray(child)) {
      child.forEach(appendChildSafe);
      return;
    }
    if (child instanceof Node) {
      e.appendChild(child);
      return;
    }
    e.appendChild(document.createTextNode(String(child)));
  };
  appendChildSafe(children);
  return e;
}

function pageShell(title, subtitle = "") {
  const section = el("section", { class: "section" });
  const container = el("div", { class: "container" });
  container.appendChild(el("div", { class: "section-head" }, [
    el("div", {}, [
      el("h2", {}, title),
      subtitle ? el("p", { class: "small-muted", style: "margin:4px 0 0" }, subtitle) : null
    ])
  ]));
  section.appendChild(container);
  section._content = container;
  return section;
}

function contentOf(shell) { return shell._content; }

/* ---------------- HOME ---------------- */
function getGreeting(date = new Date()) {
  const minutes = date.getHours() * 60 + date.getMinutes();
  if (minutes < 12 * 60) return ["Good Morning", "☀️"];
  if (minutes <= 15 * 60) return ["Good Afternoon", "🌤️"];
  return ["Good Evening", "🌆"];
}

function formatLiveDate(date) {
  return new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(date);
}

function formatLiveTime(date) {
  return new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).format(date);
}

function updateHeaderClock() {
  const now = new Date();
  document.getElementById("header-date")?.replaceChildren(document.createTextNode(formatLiveDate(now)));
  document.getElementById("header-time")?.replaceChildren(document.createTextNode(formatLiveTime(now)));
}


function renderHome() {
  const wrap = el("div");
  const [greeting, icon] = getGreeting();

  // The college photo is the hero. No glass card or blur is used here so the
  // supplied campus image remains clear and recognisable.
  const hero = el("section", { class: "hero", style: "background-image:url('assets/images/college-hero.jpeg')" });
  const inner = el("div", { class: "hero-inner" });

  inner.append(
    el("div", { class: "hero-greeting" }, `${icon} ${greeting}${currentUser ? `, ${currentUser.name}` : ""}`),
    el("div", { class: "hero-eyebrow" }, `${D.college.name} · ${D.college.location}`),
    el("h1", {}, "One place for everything happening on campus."),
    el("p", {}, "Timetables, buses, canteen prices, the campus map, and student resources — together in CAMPUS ONE."),
    el("div", { class: "hero-actions" }, [
      el("a", { class: "btn btn-primary", href: "#/timetable" }, "View timetable"),
      el("a", { class: "btn btn-ghost", href: "#/ai" }, "Ask CAMPUS ONE AI")
    ])
  );
  hero.appendChild(inner);
  wrap.appendChild(hero);

  const now = new Date();
  const [newGreeting, newIcon] = getGreeting(now);
  document.querySelector(".hero-greeting")?.replaceChildren(document.createTextNode(`${newIcon} ${newGreeting}${currentUser ? `, ${currentUser.name}` : ""}`));
  updateHeaderClock();

  wrap.appendChild(el("div", { class: "philosophy" }, el("p", {}, "For the Students. By the Students. To the Students.")));

  const searchSection = el("section", { class: "section quick-search-section" }, el("div", { class: "container" }, [
    el("div", { class: "section-head" }, [
      el("div", {}, [
        el("h2", {}, "Ask CAMPUS ONE"),
        el("p", { class: "small-muted", style: "margin:4px 0 0" }, "Ask a natural question and get the answer right here — no redirects.")
      ])
    ]),
    el("div", { class: "home-search" }, [
      el("input", { id: "home-search-input", type: "search", autocomplete: "off", placeholder: "e.g. What is the price of momo? · A2 Monday · Badhra bus · PNB ATM", "aria-label": "Ask CAMPUS ONE" }),
      el("button", { class: "btn btn-primary", type: "button", id: "home-search-button" }, "Ask")
    ]),
    el("div", { id: "home-search-result", class: "search-result", role: "status", "aria-live": "polite" })
  ]));
  wrap.appendChild(searchSection);

  const dirItems = [
    ["timetable","Timetable","Section A1 & A2 · 1st Semester · 2026-27.","Live"],
    ["bus","Bus Details","Five verified morning routes and route coordinators.","Live"],
    ["canteen","Canteen","Verified menu prices and the current special notice.","Live"],
    ["map","Campus Map","BRCM Vidyagram Campus with 78 marked facilities.","Live"],
    ["syllabus","Syllabus","Official CSE / CSE + AI/ML first-year H-Scheme syllabus.","Live"],
    ["notes","Notes","Semester-wise study resources and notes.","Ready"],
    ["library","Library","A dedicated home for library information.","Ready"],
    ["ai","AI Assistant","Ask CAMPUS ONE about verified campus data.","Live"],
    ["login","Student Login","Save a local student profile for a personal welcome.","Live"],
    ["credits","Creator Credits","Meet the four people behind CAMPUS ONE.","Live"]
  ];
  const directory = el("div", { class: "directory" });
  dirItems.forEach(([route,title,desc,status]) => {
    directory.appendChild(el("a", { href: `#/${route}` }, [
      el("span", { class: "d-title" }, title),
      el("span", { class: "d-desc" }, desc),
      el("span", { class: "d-status" + (status !== "Live" ? " pending" : "") }, status)
    ]));
  });
  wrap.appendChild(el("section", { class: "section" }, el("div", { class: "container" }, [
    el("div", { class: "section-head" }, el("h2", {}, "Everything on campus, in one directory")),
    directory
  ])));

  const searchInput = searchSection.querySelector("#home-search-input");
  const searchResult = searchSection.querySelector("#home-search-result");
  const runSearch = () => {
    const q = searchInput.value.trim();
    if (!q) {
      searchResult.textContent = "Type a campus question and I’ll answer it here.";
      searchResult.classList.remove("answer-ready");
      return;
    }
    searchResult.textContent = answerCampusQuestion(q);
    searchResult.classList.add("search-answer", "answer-ready");
  };
  searchSection.querySelector("#home-search-button").addEventListener("click", runSearch);
  searchInput.addEventListener("keydown", e => { if (e.key === "Enter") runSearch(); });

  return wrap;
}

/* ---------------- SYLLABUS ---------------- */
let activeSyllabusSemester = "1";
let activeSyllabusBranch = "cse-aiml";

function renderSyllabus() {
  const wrap = pageShell(
    "Syllabus",
    "Official B.Tech 1st-year H-Scheme syllabus · NEP-2020 · effective from 2025-26."
  );
  const body = contentOf(wrap);
  const controls = el("div", { class: "syllabus-controls" });
  const branchTabs = el("div", { class: "tabs syllabus-tabs" });
  const semesterTabs = el("div", { class: "tabs syllabus-tabs" });
  const search = el("input", { class: "syllabus-search", type: "search", placeholder: "Search subject, course code, unit or topic…", "aria-label": "Search syllabus" });
  const list = el("div", { class: "syllabus-list" });
  const sourceNote = el("div", { class: "note-box syllabus-source" }, [
    el("strong", {}, "Official source: "),
    document.createTextNode(`${SD.source.university} · ${SD.source.scheme} · ${SD.source.effective}. `),
    el("a", { href: "assets/docs/MDU_BTech_1st_Year_H_Scheme_2025-26.pdf", target: "_blank", rel: "noopener" }, "Open full official PDF")
  ]);

  function drawTabs() {
    branchTabs.replaceChildren(...SD.branches.map(branch => {
      const b = el("button", { type: "button", class: "tab" + (branch.id === activeSyllabusBranch ? " active" : "") }, branch.label);
      b.addEventListener("click", () => { activeSyllabusBranch = branch.id; draw(); });
      return b;
    }));
    semesterTabs.replaceChildren(...Object.entries(SD.semesters).map(([key, sem]) => {
      const b = el("button", { type: "button", class: "tab" + (key === activeSyllabusSemester ? " active" : "") }, sem.label);
      b.addEventListener("click", () => { activeSyllabusSemester = key; draw(); });
      return b;
    }));
  }

  function courseCard(course) {
    const card = el("article", { class: "syllabus-card" });
    const head = el("button", { type: "button", class: "syllabus-card-head", "aria-expanded": "false" }, [
      el("div", { class: "syllabus-card-title" }, [
        el("span", { class: "syllabus-code" }, course.code),
        el("h3", {}, course.title),
        el("p", { class: "small-muted" }, course.category)
      ]),
      el("div", { class: "syllabus-meta" }, [
        el("span", {}, `${course.credits} credit${course.credits === 1 ? "" : "s"}`),
        el("span", {}, course.scheme),
        el("span", {}, "View details ▾")
      ])
    ]);
    const details = el("div", { class: "syllabus-details", hidden: "true" });
    const grid = el("div", { class: "syllabus-detail-grid" });
    grid.appendChild(el("div", {}, [
      el("h4", {}, "Assessment"),
      el("p", {}, `${course.marks}. Exam: ${course.exam}.`)
    ]));
    grid.appendChild(el("div", {}, [
      el("h4", {}, "Official pages"),
      el("p", {}, `Pages ${course.pages} of the supplied PDF.`)
    ]));
    details.appendChild(grid);

    details.appendChild(el("h4", {}, "Course objectives"));
    details.appendChild(el("ul", { class: "syllabus-bullets" }, course.objectives.map(x => el("li", {}, x))));

    details.appendChild(el("h4", {}, "Course content"));
    const units = el("div", { class: "syllabus-units" });
    course.units.forEach(([title, text]) => units.appendChild(el("section", { class: "syllabus-unit" }, [
      el("strong", {}, title),
      el("p", {}, text)
    ])));
    details.appendChild(units);

    details.appendChild(el("h4", {}, "Course outcomes"));
    details.appendChild(el("ul", { class: "syllabus-bullets" }, course.outcomes.map(x => el("li", {}, x))));

    if (course.references?.length) {
      details.appendChild(el("h4", {}, "Selected references"));
      details.appendChild(el("ul", { class: "syllabus-bullets compact" }, course.references.map(x => el("li", {}, x))));
    }

    head.addEventListener("click", () => {
      const open = !details.hidden;
      details.hidden = open;
      head.setAttribute("aria-expanded", String(!open));
      head.querySelector(".syllabus-meta span:last-child").textContent = open ? "View details ▾" : "Hide details ▴";
    });
    card.append(head, details);
    return card;
  }

  function draw() {
    drawTabs();
    const sem = SD.semesters[activeSyllabusSemester];
    const query = normalizeAIText(search.value);
    const courses = sem.courses.filter(course => {
      if (!query) return true;
      const haystack = normalizeAIText([course.code, course.title, course.category, ...(course.aliases || []), ...(course.objectives || []), ...(course.outcomes || []), ...course.units.flat()].join(" "));
      return haystack.includes(query);
    });
    list.replaceChildren(...courses.map(courseCard));
    if (!courses.length) list.appendChild(el("div", { class: "note-box" }, "No syllabus course matched that search."));
  }

  search.addEventListener("input", draw);
  controls.append(
    el("div", {}, [el("div", { class: "control-label" }, "Branch"), branchTabs]),
    el("div", {}, [el("div", { class: "control-label" }, "Year / Semester"), semesterTabs]),
    search
  );
  body.append(sourceNote, controls, list);
  draw();
  return wrap;
}

function syllabusCourses() {
  return Object.entries(SD.semesters).flatMap(([semester, data]) => data.courses.map(course => ({ ...course, semester })));
}

function findSyllabusCourse(question) {
  const q = normalizeAIText(question);
  const courses = syllabusCourses();
  const best = courses
    .map(course => {
      const aliases = [course.title, ...(course.aliases || [])].map(normalizeAIText).filter(Boolean);
      const code = normalizeAIText(course.code);
      let score = 0;
      if (code && q.includes(code)) score = Math.max(score, code.length + 30);
      const paddedQuestion = ` ${q} `;
      aliases.forEach(alias => {
        if (paddedQuestion.includes(` ${alias} `)) score = Math.max(score, alias.length + 20);
      });
      if (paddedQuestion.includes(" maths 1 ") || paddedQuestion.includes(" math 1 ") || paddedQuestion.includes(" maths i ") || paddedQuestion.includes(" math i ")) score = Math.max(score, course.title.includes("Mathematics-I") ? 40 : 0);
      if (paddedQuestion.includes(" maths 2 ") || paddedQuestion.includes(" math 2 ") || paddedQuestion.includes(" maths ii ") || paddedQuestion.includes(" math ii ")) score = Math.max(score, course.title.includes("Mathematics-II") ? 40 : 0);
      if (q.includes("physics")) score = Math.max(score, course.title.includes("Physics") ? 30 : 0);
      if (q.includes("pps")) score = Math.max(score, course.title.toLowerCase().includes("programming for problem solving") ? 35 : 0);
      return { course, score };
    })
    .sort((a, b) => b.score - a.score)[0];
  return best && best.score > 0 ? best.course : null;
}

function answerSyllabusQuestion(question) {
  const original = String(question || "").trim();
  const q = normalizeAIText(original);
  const course = findSyllabusCourse(q);
  const syllabusIntent = hasAny(q, ["syllabus", "silebas", "unit", "course content", "topics", "course code", "credits", "credit", "objective", "outcome", "what do we study", "what is taught", "subject"]);
  if (!course && !syllabusIntent) return null;

  if (!course) {
    const sem = q.includes("semester 2") || q.includes("sem 2") || q.includes("second semester") ? "2" : "1";
    const titles = SD.semesters[sem].courses.map(c => `${c.title} (${c.code})`).join("; ");
    return `${SD.semesters[sem].label} CSE-family syllabus courses in CAMPUS ONE:\n${titles}`;
  }

  const unitMatch = q.match(/(?:unit|module)\s*[- ]?(iv|iii|ii|i|v|[1-5])\b/);
  const unitNumber = unitMatch ? ({ i:1, ii:2, iii:3, iv:4, v:5, "1":1, "2":2, "3":3, "4":4, "5":5 }[unitMatch[1]]) : null;
  if (unitNumber && course.units[unitNumber - 1]) {
    const [title, text] = course.units[unitNumber - 1];
    return `${course.title} — ${title}\n${text}`;
  }
  if (hasAny(q, ["course code", "code kya", "code kya hai"])) return `${course.title} course code is ${course.code}.`;
  if (hasAny(q, ["credits", "credit"])) return `${course.title} carries ${course.credits} credit${course.credits === 1 ? "" : "s"}. Scheme: ${course.scheme}.`;
  if (hasAny(q, ["objective", "objectives"])) return `${course.title} objectives:\n• ${course.objectives.join("\n• ")}`;
  if (hasAny(q, ["outcome", "outcomes", "co"])) return `${course.title} course outcomes:\n• ${course.outcomes.join("\n• ")}`;
  return `${course.title} (${course.code}) — ${course.credits} credits.\n${course.units.map(([title, text]) => `${title}: ${text}`).join("\n\n")}`;
}

/* ---------------- TIMETABLE ---------------- */
function renderTimetable() {
  const wrap = pageShell("Timetable", "B.Tech · 1st Semester · Odd Semester 2026-27 · Department of Applied Sciences & Humanities");
  const body = contentOf(wrap);

  const draw = () => {
    body.querySelector(".page-content")?.remove();
    const content = el("div", { class: "page-content" });
    const sec = D.timetables.sections[activeSection];

    content.appendChild(el("div", { class: "tabs" }, Object.keys(D.timetables.sections).map(key => {
      const t = el("button", { class: "tab" + (key === activeSection ? " active" : "") }, D.timetables.sections[key].label);
      t.addEventListener("click", () => { activeSection = key; draw(); });
      return t;
    })));

    content.appendChild(el("p", { class: "small-muted" },
      `Effective from ${sec.effectiveFrom} · Class Coordinator: ${sec.classCoordinator} · Timetable Incharge: ${sec.timetableIncharge}`));

    const table = el("table");
    table.appendChild(el("thead", {}, el("tr", {}, [
      el("th", {}, "Day"),
      ...D.timetables.periods.map(p => el("th", { style: "white-space:pre-line" }, `${p.no}\n${p.time}`))
    ])));
    const tbody = el("tbody");
    Object.entries(sec.days).forEach(([day, cells]) => {
      tbody.appendChild(el("tr", {}, [
        el("td", { style: "font-weight:600;color:var(--ink)" }, day),
        ...cells.map((c,i) => i === 5 ? el("td", { class: "lunch-col" }, "LUNCH") : el("td", {}, c || "—"))
      ]));
    });
    table.appendChild(tbody);
    content.appendChild(el("div", { class: "table-wrap" }, table));

    const ftable = el("table");
    ftable.appendChild(el("thead", {}, el("tr", {}, [el("th",{}, "Subject / Lab"), el("th",{}, "Faculty")])));
    ftable.appendChild(el("tbody", {}, sec.faculty.map(([s,f]) => el("tr", {}, [el("td",{},s),el("td",{},f)]))));
    content.appendChild(el("h3", { style: "margin-top:32px" }, "Subject & lab faculty"));
    content.appendChild(el("div", { class: "table-wrap" }, ftable));
    content.appendChild(el("p", { class: "small-muted", style: "margin-top:14px" },
      "All students are directed to contact their class coordinator/mentor for academic or non-academic problems."));
    body.appendChild(content);
  };
  draw();
  return wrap;
}

/* ---------------- BUS ---------------- */
function renderBus() {
  const wrap = pageShell("Bus Details", "Morning up-routes supplied by BRCM Education Society, Bahal");
  const body = contentOf(wrap);
  body.appendChild(el("div", { class: "note-box" }, D.bus.note));
  D.bus.routes.forEach(route => {
    const block = el("div", { class: "route-block" });
    block.appendChild(el("h3", {}, [route.name, el("span", { class: "arrival" }, `Campus arrival ${route.campusArrival}`)]));
    const table = el("table");
    table.appendChild(el("thead", {}, el("tr", {}, [el("th",{}, "#"),el("th",{}, "Village"),el("th",{}, "Morning arrival")])));
    table.appendChild(el("tbody", {}, route.stops.map((s,i) => el("tr", {}, [el("td",{},String(i+1)),el("td",{},s[0]),el("td",{},s[1])] ))));
    block.appendChild(el("div", { class: "table-wrap" }, table));
    body.appendChild(block);
  });
  body.appendChild(el("h3", { style: "margin-top:10px" }, "Route coordinators"));
  body.appendChild(el("div", { class: "contact-grid" }, D.bus.coordinators.map(c =>
    el("div", {}, [el("div",{class:"c-role"},c.route),el("div",{class:"c-name"},c.name),el("div",{class:"c-phone"},c.contact)])
  )));
  body.appendChild(el("p", { class:"small-muted", style:"margin-top:18px" }, [
    "Original documents: ",
    el("a",{href:"assets/docs/Bus_Time_Table.pdf",target:"_blank",rel:"noopener"},"Bus Time Table"),
    " · ",
    el("a",{href:"assets/docs/Bus_Route_Coordinators.pdf",target:"_blank",rel:"noopener"},"Route Coordinators")
  ]));
  return wrap;
}

/* ---------------- CANTEEN ---------------- */
function renderCanteen() {
  const wrap = pageShell("Canteen", "Current supplied menu at the campus canteen");
  const body = contentOf(wrap);
  const grid = el("div", { class: "grid-2" });
  const left = el("div");
  left.appendChild(el("h3", {}, "Menu"));
  left.appendChild(el("ul", { class: "item-list" }, D.canteen.items.map(it =>
    el("li", {}, [el("span",{},it.name),el("span",{class:"price"},`₹${it.price}`)])
  )));
  const right = el("div");
  right.appendChild(el("h3", {}, "Canteen timings"));
  right.appendChild(el("div", { class: "note-box" }, [
    el("p", {}, [el("strong", {}, "Opening: "), D.canteen.openingTime]),
    el("p", {}, [el("strong", {}, "Closing: "), D.canteen.closingTime]),
    el("p", {}, D.canteen.weekendNote)
  ]));
  right.appendChild(el("h3", {style:"margin-top:22px"}, "Tuck Shop"));
  right.appendChild(el("div", { class: "note-box" }, [
    el("p", {}, [el("strong", {}, `${D.canteen.tuckShop.name} — ${D.canteen.tuckShop.location}`)]),
    el("p", {}, D.canteen.tuckShop.note)
  ]));
  right.appendChild(el("h4",{style:"margin-top:22px"},"Original menu board"));
  right.appendChild(el("img",{src:"assets/images/canteen-menu.jpeg",alt:"Canteen menu board",style:"border:1px solid var(--line)"}));
  grid.append(left,right); body.appendChild(grid); return wrap;
}

/* ---------------- MAP ---------------- */
function renderMap() {
  const wrap = pageShell("Campus Map", D.map.title);
  const body = contentOf(wrap);
  body.appendChild(el("div", { class: "note-box" }, D.map.note));

  const layout = el("div", { class: "map-layout" });

  /* Keep the existing CAMPUS ONE map layout, but make the supplied map image
     interactive: zoom, drag/pan, reset and clickable legend selection. */
  const viewer = el("div", { class: "map-viewer", "aria-label": "Interactive BRCM campus map" });
  const mapImg = el("img", {
    class: "interactive-campus-map",
    src: "assets/images/campus-map.jpeg",
    alt: "BRCM Vidyagram Campus (Bahal) map with numbered facilities 1 to 78",
    draggable: "false"
  });
  const controls = el("div", { class: "map-controls", "aria-label": "Map controls" });
  const zoomOut = el("button", { type: "button", class: "map-control-btn", title: "Zoom out", "aria-label": "Zoom out" }, "−");
  const zoomLevel = el("span", { class: "map-zoom-level", "aria-live": "polite" }, "100%");
  const zoomIn = el("button", { type: "button", class: "map-control-btn", title: "Zoom in", "aria-label": "Zoom in" }, "+");
  const reset = el("button", { type: "button", class: "map-control-btn map-reset", title: "Reset map", "aria-label": "Reset map" }, "↺");
  controls.append(zoomOut, zoomLevel, zoomIn, reset);
  viewer.append(mapImg, controls);

  let scale = 1;
  let panX = 0;
  let panY = 0;
  let dragging = false;
  let moved = false;
  let startX = 0;
  let startY = 0;
  let startPanX = 0;
  let startPanY = 0;

  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
  function applyMapTransform() {
    mapImg.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${scale})`;
    zoomLevel.textContent = `${Math.round(scale * 100)}%`;
  }
  function setZoom(nextScale, anchorX = viewer.clientWidth / 2, anchorY = viewer.clientHeight / 2) {
    const oldScale = scale;
    scale = clamp(nextScale, 1, 4);
    if (scale === 1) {
      panX = 0;
      panY = 0;
    } else if (oldScale !== scale) {
      const factor = scale / oldScale;
      panX = anchorX - (anchorX - panX) * factor;
      panY = anchorY - (anchorY - panY) * factor;
    }
    applyMapTransform();
  }

  zoomIn.addEventListener("click", () => setZoom(scale + 0.25));
  zoomOut.addEventListener("click", () => setZoom(scale - 0.25));
  reset.addEventListener("click", () => { scale = 1; panX = 0; panY = 0; applyMapTransform(); });

  viewer.addEventListener("wheel", event => {
    event.preventDefault();
    const rect = viewer.getBoundingClientRect();
    const anchorX = event.clientX - rect.left;
    const anchorY = event.clientY - rect.top;
    setZoom(scale + (event.deltaY < 0 ? 0.2 : -0.2), anchorX, anchorY);
  }, { passive: false });

  viewer.addEventListener("pointerdown", event => {
    if (event.target.closest(".map-controls")) return;
    dragging = true;
    moved = false;
    startX = event.clientX;
    startY = event.clientY;
    startPanX = panX;
    startPanY = panY;
    viewer.setPointerCapture?.(event.pointerId);
    viewer.classList.add("is-dragging");
  });

  viewer.addEventListener("pointermove", event => {
    if (!dragging) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
    panX = startPanX + dx;
    panY = startPanY + dy;
    applyMapTransform();
  });

  const finishDrag = event => {
    if (!dragging) return;
    dragging = false;
    viewer.classList.remove("is-dragging");
    try { viewer.releasePointerCapture?.(event.pointerId); } catch (_) {}
  };
  viewer.addEventListener("pointerup", finishDrag);
  viewer.addEventListener("pointercancel", finishDrag);

  /* Double click zooms in, while keeping normal click behavior untouched. */
  viewer.addEventListener("dblclick", event => {
    if (event.target.closest(".map-controls")) return;
    const rect = viewer.getBoundingClientRect();
    setZoom(scale >= 4 ? 1 : scale + 0.75, event.clientX - rect.left, event.clientY - rect.top);
  });

  applyMapTransform();

  const right = el("div");
  const search = el("input", {
    class: "legend-search",
    type: "search",
    placeholder: "Search facilities (e.g. hostel, canteen, ground)…",
    "aria-label": "Search campus facilities"
  });
  const selected = el("div", { class: "map-selection", "aria-live": "polite" }, "Select a facility from the list to identify it on the official map.");
  const list = el("ul", { class: "legend-list" });

  function drawList(filter = "") {
    const normalized = filter.trim().toLowerCase();
    list.replaceChildren();
    const matches = D.map.facilities.filter(([number, name]) =>
      !normalized || String(number).includes(normalized) || name.toLowerCase().includes(normalized)
    );
    matches.forEach(([number, name]) => {
      const item = el("li", { class: "legend-item", tabindex: "0", role: "button", "data-facility": String(number) }, [
        el("span", { class: "num" }, String(number)),
        el("span", {}, name)
      ]);
      const selectFacility = () => {
        list.querySelectorAll(".legend-item.selected").forEach(node => node.classList.remove("selected"));
        item.classList.add("selected");
        selected.textContent = `Facility #${number}: ${name}`;
        selected.classList.add("active");
      };
      item.addEventListener("click", selectFacility);
      item.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectFacility();
        }
      });
      list.appendChild(item);
    });
    if (!matches.length) {
      list.appendChild(el("li", { class: "legend-empty" }, "No matching facility found."));
    }
  }

  search.addEventListener("input", event => drawList(event.target.value));
  drawList();
  right.append(search, selected, list);
  layout.append(viewer, right);
  body.appendChild(layout);

  body.appendChild(el("div", { class: "map-help small-muted" },
    "Map controls: use + / −, mouse wheel or double-click to zoom. Drag the map to pan; use ↺ to reset. Facility names are taken from the supplied BRCM campus legend."
  ));

  return wrap;
}

/* ---------------- AI ---------------- */
function renderAI() {
  const wrap = pageShell(
    "Campus AI Assistant",
    "Ask CAMPUS ONE about BRCM campus information — the assistant answers directly from verified project data."
  );
  const body = contentOf(wrap);
  const box = el("div", { class: "ai-panel" });
  const messages = el("div", { class: "ai-messages", "aria-live": "polite" });

  const suggestions = el("div", { class: "ai-suggestions" }, [
    "A2 Monday timetable",
    "Badhra bus timing",
    "Momos price",
    "Who teaches Physics-I in A2?",
    "Momos price",
    "CSE Maths-I Unit II",
    "PPS Unit IV",
    "How many facilities are on the campus map?"
  ].map(text => el("button", { type: "button", class: "ai-chip" }, text)));

  const form = el("form", { class: "ai-form" }, [
    el("textarea", {
      name: "message",
      required: "true",
      rows: "3",
      placeholder: "Ask anything about BRCM — e.g. “Who teaches PPS in A1?” or “Where is the canteen?”",
      "aria-label": "Ask CAMPUS ONE AI"
    }),
    el("button", { class: "btn btn-primary", type: "submit" }, "Ask CAMPUS ONE")
  ]);

  box.append(messages, suggestions, form);
  body.appendChild(box);

  addChat(
    "CAMPUS ONE AI",
    "Hi! 👋 I’m CAMPUS ONE AI. Ask your question naturally — about the college, timetable, faculty, buses, canteen, campus facilities, syllabus, notes or library. I’ll answer directly in this chat and will never redirect you just to avoid a question.",
    "assistant"
  );

  suggestions.querySelectorAll(".ai-chip").forEach(button => {
    button.addEventListener("click", () => {
      form.elements.message.value = button.textContent;
      form.requestSubmit();
    });
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const message = String(new FormData(form).get("message") || "").trim();
    if (!message) return;
    addChat("You", message, "user");
    form.reset();
    const submit = form.querySelector("button[type=submit]");
    submit.disabled = true;
    submit.textContent = "Thinking…";

    // Keep the UI responsive while the local knowledge engine works.
    setTimeout(() => {
      addChat("CAMPUS ONE AI", answerCampusQuestion(message), "assistant");
      submit.disabled = false;
      submit.textContent = "Ask CAMPUS ONE";
    }, 180);
  });

  function addChat(who, text, kind) {
    const row = el("div", { class: `chat-row ${kind}` }, [
      el("strong", {}, who),
      el("div", { class: "chat-text" }, text)
    ]);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  return wrap;
}

function normalizeAIText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9\u0900-\u097f+./ -]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasAny(text, words) {
  return words.some(word => {
    const w = normalizeAIText(word);
    if (!w) return false;
    if (w.includes(" ")) return text.includes(w);
    return new RegExp(`(^|\\s)${w.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}(?=\\s|$)`, "i").test(text);
  });
}

function prettyDay(day) {
  return day.charAt(0) + day.slice(1).toLowerCase();
}

function subjectMatches(question, subject) {
  const q = normalizeAIText(question);
  const s = normalizeAIText(subject);
  if (q.includes(s)) return true;
  const compact = s.replace(/[^a-z0-9]/g, "");
  const qCompact = q.replace(/[^a-z0-9]/g, "");
  if (compact && qCompact.includes(compact)) return true;
  // Handle natural singular/plural phrasing such as “momo” → “momos”.
  if (s.endsWith("s") && s.length > 4 && q.includes(s.slice(0, -1))) return true;
  if (s.includes(" & ")) {
    const parts = s.split(" & ").map(x => x.trim()).filter(Boolean);
    if (parts.some(part => q.includes(part))) return true;
  }
  return s.split(/[^a-z0-9]+/).filter(x => x.length > 3).some(part => q.includes(part));
}

function findCanteenItem(question) {
  return D.canteen.items.find(item => subjectMatches(question, item.name));
}

function findFacility(question) {
  const q = normalizeAIText(question);
  return D.map.facilities.find(([number, name]) => {
    const n = normalizeAIText(name);
    if (q.includes(n)) return true;
    return n.split(/[/ ,()-]+/).filter(x => x.length > 3).some(token => q.includes(token));
  });
}

function answerCampusQuestion(question) {
  const original = String(question || "").trim();
  const q = normalizeAIText(original);
  if (!q) return "Please type a question about CAMPUS ONE.";

  // Small conversational layer so the assistant feels like an assistant,
  // not a page-search box.
  if (/^(hi|hii|hello|hey|heyy|namaste)\b/.test(q)) {
    const [greeting] = getGreeting();
    return `${greeting}! 👋 I’m CAMPUS ONE AI. Ask me about your college, timetable, faculty, buses, canteen, campus facilities, syllabus, notes or library.`;
  }
  if (hasAny(q, ["thank you", "thanks", "dhanyawad"])) return "You're welcome! 😊 Ask me anything else about CAMPUS ONE.";
  if (hasAny(q, ["what can you do", "what can i ask", "help me", "help", "tum kya kar sakte ho"])) {
    return "You can ask me natural questions about BRCM College, A1/A2 timetable and faculty, bus routes and timings, canteen prices, campus facilities, and the CAMPUS ONE team. I answer in this chat without sending you to another page.";
  }

  // Current date/time.
  if (hasAny(q, ["what time is it", "current time", "time now", "abhi kitne baje", "abhi time", "aaj ki date", "today date", "what is today's date"])) {
    const now = new Date();
    return `It is ${formatLiveTime(now)} on ${formatLiveDate(now)}.`;
  }

  // CAMPUS ONE / college identity.
  if (hasAny(q, ["what is campus one", "campus one kya", "about campus one", "what does campus one do", "campus one kya hai"])) {
    return "CAMPUS ONE is a student-focused digital campus companion for BRCM College of Engineering & Technology, Bahal. It brings campus information such as timetable, bus details, canteen prices, the campus map and student resources together in one place.";
  }
  if (hasAny(q, ["college name", "name of college", "which college", "college ka naam", "college konsa", "college kaunsa", "what is brcm", "brcm college name"])) {
    return `${D.college.name}, ${D.college.location}.`;
  }
  if (hasAny(q, ["where is college", "college location", "college kaha", "location of college", "college kaha hai", "campus kaha hai", "where is brcm"])) {
    return `The college is at ${D.college.location}. The campus is ${D.college.campusName}.`;
  }
  if (hasAny(q, ["society", "education society", "management society", "who runs the college"])) {
    return `The supplied CAMPUS ONE data lists ${D.college.society}.`;
  }
  if (hasAny(q, ["college details", "about college", "tell me about college", "college ke bare mein", "college ke baare mein"])) {
    return `${D.college.name} is part of ${D.college.society}. Location: ${D.college.location}. Campus: ${D.college.campusName}.`;
  }

  // Team / credits.
  if (hasAny(q, ["credits", "team", "developers", "developer", "who made", "kisne banaya", "who developed", "team members"])) {
    return "CAMPUS ONE team:\n• Ankeetkesh Kumar — Lead Developer & UI Design\n• Hemant Sharma — Development & Testing\n• Nikita Sharma — Co-Developer & UI Design\n• Pushpander — Content & Research.";
  }

  // Canteen: resolve the named food item BEFORE generic price/menu handling.
  const itemAliases = [
    ["Chaw Mein", ["chaw mein", "chow mein", "chowmein", "chaow mein"]],
    ["Momos", ["momo", "momos"]],
    ["Pasta", ["pasta"]],
    ["Burger Chaw Mein", ["burger chaw mein", "burger chow mein"]],
    ["Sandwich", ["sandwich"]],
    ["Fried Rice", ["fried rice"]],
    ["Spring Roll", ["spring roll", "spring rolls"]],
    ["Manchurian", ["manchurian"]],
    ["Chilli Potatoes", ["chilli potatoes", "chili potatoes"]],
    ["Chole Bhature", ["chole bhature", "chhola bhatura"]],
    ["Fries", ["fries", "french fries"]],
    ["Maggie Plane", ["maggie plane", "plain maggie", "maggie plain"]],
    ["Maggie Veg", ["maggie veg", "veg maggie"]],
    ["Cholla Samosa", ["cholla samosa", "chola samosa"]],
    ["Samosa", ["samosa", "samosas"]],
    ["Bread Pakoda", ["bread pakoda", "bread pakora"]],
    ["Patties", ["patties", "patty"]]
  ];
  const matchedAlias = itemAliases.find(([, aliases]) => aliases.some(alias => q.includes(alias)));
  const canteenIntent = hasAny(q, ["canteen", "food", "menu", "price", "cost", "rate", "kitne ka", "kitne ki", "khane", "tuck shop", "tuckshop", "opening time", "closing time", "open time", "close time", "weekend", "saturday", "sunday"]);
  if (matchedAlias || canteenIntent) {
    if (matchedAlias) {
      const item = D.canteen.items.find(x => x.name === matchedAlias[0]);
      if (item) return `${item.name} is listed at ₹${item.price} on the supplied canteen menu.`;
    }
    if (hasAny(q, ["where is canteen", "where is the canteen", "canteen kaha", "canteen location", "canteen kaha hai"])) {
      return "The campus map lists “Canteen College” as facility #73. The supplied map does not provide precise room-level directions.";
    }
    if (hasAny(q, ["opening time", "open time", "opens", "opening", "kab khulta", "khulta kab"])) {
      return `The canteen opens at ${D.canteen.openingTime}.`;
    }
    if (hasAny(q, ["closing time", "close time", "closes", "closing", "kab band", "band kab"])) {
      return `The canteen closes at ${D.canteen.closingTime}.`;
    }
    if (hasAny(q, ["saturday", "sunday", "weekend", "hostler", "hostlers"])) {
      return `Yes. The canteen is also open on Saturday and Sunday for the hostlers.`;
    }
    if (hasAny(q, ["tuck shop", "tuckshop", "accessories", "notebook", "notebooks", "pen", "pens", "hostel items"])) {
      return `The Tuck Shop is in front of the canteen. All students can purchase accessories and everyday essentials there, including notebooks, pens, hostel items, and more.`;
    }
    return `The canteen is open from ${D.canteen.openingTime} to ${D.canteen.closingTime}. It is also open on Saturday and Sunday for hostlers. Ask me the name of a menu item for its listed price.`;
  }

  // Timetable and faculty. Natural aliases such as “maths” and “PPS” are
  // handled explicitly so ordinary questions do not fall through.
  const sectionMatch = q.match(/\b(a1|a2)\b/);
  const dayMap = {
    monday: "MONDAY", mon: "MONDAY", tuesday: "TUESDAY", tue: "TUESDAY", tues: "TUESDAY",
    wednesday: "WEDNESDAY", wed: "WEDNESDAY", thursday: "THURSDAY", thu: "THURSDAY", thurs: "THURSDAY",
    friday: "FRIDAY", fri: "FRIDAY"
  };
  const dayKey = Object.entries(dayMap).find(([name]) => q.includes(name))?.[1];
  const subjectAliases = {
    "maths-i": ["maths", "maths i", "mathematics", "mathematics i"],
    "physics-i": ["physics", "physics i"],
    "english": ["english"],
    "pps": ["pps", "programming for problem solving", "programming"],
    "egd": ["egd", "engineering graphics", "graphics and design"],
    "bme": ["bme", "basic mechanical engineering", "mechanical engineering"]
  };
  const subjectAliasFor = text => Object.entries(subjectAliases).find(([, aliases]) => aliases.some(a => text.includes(a)))?.[0];
  const requestedSubject = subjectAliasFor(q);

  const facultyIntent = hasAny(q, ["faculty", "teacher", "teachers", "professor", "sir", "mam", "maam", "who teaches", "who is teaching", "kaun padhata", "kaun padha", "teacher of"]);
  if (facultyIntent) {
    const sections = [];
    const facultySections = sectionMatch
      ? [[sectionMatch[1].toUpperCase(), D.timetables.sections[sectionMatch[1].toUpperCase()]]]
      : Object.entries(D.timetables.sections);
    for (const [, sec] of facultySections) {
      let matches = sec.faculty.filter(([subject, teacher]) => {
        if (requestedSubject) {
          const subjectNorm = normalizeAIText(subject);
          if (requestedSubject === "maths-i") return subjectNorm.includes("mathemat") || subjectNorm.includes("maths");
          if (requestedSubject === "physics-i") return subjectNorm === "physics-i" || subjectNorm === "physics i";
          return subjectNorm.includes(requestedSubject) || subjectMatches(q, subject);
        }
        return subjectMatches(q, subject) || subjectMatches(q, teacher);
      });
      // If a base subject was explicitly requested, prefer the base subject
      // over its lab entry unless the user explicitly asks for the lab.
      if (requestedSubject && !hasAny(q, ["lab", "laboratory"])) {
        const base = matches.filter(([subject]) => !normalizeAIText(subject).includes("lab"));
        if (base.length) matches = base;
      }
      if (matches.length) sections.push(`${sec.label}: ${matches.map(([subject, teacher]) => `${subject} — ${teacher}`).join("; ")}`);
    }
    if (sections.length) return sections.join("\n");
    return "I can answer faculty questions for the supplied A1 and A2 timetable data. Try Physics-I, Mathematics-I/Maths-I, PPS, EGD, BME or English.";
  }

  const timetableIntent = hasAny(q, ["timetable", "time table", "schedule", "class", "classes", "lecture", "period", "aaj ka class", "today class", "kab hai", "when is"]);
  if (timetableIntent || sectionMatch || dayKey) {
    if (requestedSubject && sectionMatch && !dayKey) {
      const sec = D.timetables.sections[sectionMatch[1].toUpperCase()];
      const hits = sec.faculty.filter(([subject]) => {
        const n = normalizeAIText(subject);
        return requestedSubject === "maths-i" ? n.includes("mathemat") || n.includes("maths") : n.includes(requestedSubject);
      });
      const schedule = Object.entries(sec.days).flatMap(([day, row]) => row.map((subject, i) => subject && normalizeAIText(subject).includes(requestedSubject === "maths-i" ? "math" : requestedSubject.split("-")[0]) ? `${prettyDay(day)} — ${D.timetables.periods[i].time}: ${subject}` : null).filter(Boolean));
      if (schedule.length) return `${sec.label} — ${requestedSubject.toUpperCase()}\n${schedule.join("\n")}`;
      if (hits.length) return `${sec.label}: ${hits.map(([subject, teacher]) => `${subject} — ${teacher}`).join("; ")}`;
    }
    if (sectionMatch && dayKey) {
      const sec = D.timetables.sections[sectionMatch[1].toUpperCase()];
      const row = sec?.days?.[dayKey];
      if (row) {
        const classes = row.map((subject, i) => subject ? `${D.timetables.periods[i].no} (${D.timetables.periods[i].time}): ${subject}` : null).filter(Boolean);
        return `${sec.label} — ${prettyDay(dayKey)}\n${classes.join("\n")}`;
      }
    }
    if (sectionMatch && !dayKey) return `${D.timetables.sections[sectionMatch[1].toUpperCase()].label} timetable data is available for Monday–Friday. Ask for a day, such as “${sectionMatch[1].toUpperCase()} Monday timetable”.`;
    if (dayKey && !sectionMatch) return `I have both A1 and A2 timetable data. Ask “A1 ${prettyDay(dayKey)}” or “A2 ${prettyDay(dayKey)}” and I’ll list the periods here.`;
    if (hasAny(q, ["timing", "period timing", "college timing", "class timing", "period time", "college kab tak"])) return "The supplied timetable periods run from 9:00 AM to 2:55 PM. The lunch period is 12:45 PM–1:35 PM.";
    return "I have verified timetable data for Sections A1 and A2, Monday–Friday. Ask me a section and day, for example “A2 Monday timetable”.";
  }

  // Bus.
  if (hasAny(q, ["bus", "route", "bus timing", "bus time", "bus kab", "bus kaha", "transport", "bus stop"])) {
    const route = D.bus.routes.find(r => q.includes(normalizeAIText(r.name)));
    if (route) {
      const routeAskedAsWhole = hasAny(q, ["route", "bus timing", "bus time", "bus kab", "reaches campus", "campus arrival", "bus arrival"]);
      if (routeAskedAsWhole) {
        return `${route.name} route reaches campus at ${route.campusArrival} AM. Its supplied stops are: ${route.stops.map(([name, time]) => `${name} — ${time} AM`).join(", ")}.`;
      }
      const stop = route.stops.find(([name]) => {
        const n = normalizeAIText(name);
        return q.includes(n) || (n.length > 3 && n.split(/[ /-]+/).some(token => token.length > 3 && q.includes(token)));
      });
      if (stop) return `On the ${route.name} route, ${stop[0]} is listed at ${stop[1]} AM. The campus arrival is ${route.campusArrival} AM.`;
      return `${route.name} route reaches campus at ${route.campusArrival} AM. Its supplied stops are listed in CAMPUS ONE.`;
    }
    const coordinator = D.bus.coordinators.find(c => q.includes(normalizeAIText(c.route)) || subjectMatches(q, c.name));
    if (coordinator) return `${coordinator.route} bus coordinator: ${coordinator.name}, ${coordinator.contact}.`;
    return "Verified morning bus routes available in CAMPUS ONE are Badhra, Tosham, Siwani, Jui and Bhiwani. Ask me a route or stop and I’ll give the supplied timing here. Return/evening timings are not available in the supplied data.";
  }

  // Campus facilities / map. This runs after canteen so “where is the canteen?”
  // is answered as a canteen question, not swallowed by a generic location rule.
  if (hasAny(q, ["map", "facility", "facilities", "where is", "kaha hai", "campus mein", "campus me", "location", "atm", "hostel", "ground", "building", "college building"])) {
    if (hasAny(q, ["how many", "kitne", "total", "how many facilities"])) return `The BRCM Vidyagram Campus map contains ${D.map.facilities.length} numbered facilities.`;
    const facility = findFacility(q);
    if (facility) return `The campus map lists facility #${facility[0]} as “${facility[1]}”. The supplied map does not provide precise room-level directions.`;
    return `The CAMPUS ONE campus map is based on the BRCM Vidyagram Campus map and contains ${D.map.facilities.length} numbered facilities. Ask me a facility name and I’ll answer from the supplied map data.`;
  }

  // Official syllabus: answer directly in chat from the supplied MDU H-Scheme data.
  const syllabusAnswer = answerSyllabusQuestion(original);
  if (syllabusAnswer) return syllabusAnswer;
  if (hasAny(q, ["notes", "study material", "study notes"])) return "Official Notes/study material has not yet been supplied for CAMPUS ONE, so I won’t invent course notes.";
  if (hasAny(q, ["library", "लाइब्रेरी"])) return "Official library timings, rules and catalogue details have not yet been supplied for CAMPUS ONE, so I won’t guess them.";

  return "I don’t have a verified answer for that in the current CAMPUS ONE data. I’ll stay here in the chat rather than sending you to another section. If you ask about the college, timetable, faculty, bus, canteen or campus map, I can answer from the supplied data.";
}

/* ---------------- LOGIN ---------------- */
function renderLogin() {
  const wrap=pageShell("Student Login","A simple local profile for the frontend-only CAMPUS ONE experience.");
  const body=contentOf(wrap);
  if(currentUser){
    body.appendChild(el("div",{class:"placeholder"},[
      el("span",{class:"stamp"},"Signed in"),
      el("h3",{},`Welcome, ${currentUser.name}`),
      el("p",{},currentUser.email),
      el("button",{class:"btn btn-ghost dark-btn",onclick:()=>{localStorage.removeItem("campus_one_user");currentUser=null;toast("Logged out.");navigate();}},"Log out")
    ]));
    return wrap;
  }
  const form=makeForm("Create your local student profile",[
    ["name","Name","text","Your name"],["email","Email","email","you@example.com"]
  ],"Continue");
  body.appendChild(form.card);
  form.form.addEventListener("submit",e=>{
    e.preventDefault(); const data=Object.fromEntries(new FormData(form.form));
    currentUser={name:data.name.trim(),email:data.email.trim()};
    localStorage.setItem("campus_one_user",JSON.stringify(currentUser));
    toast("Profile saved."); location.hash="#/home";
  });
  body.appendChild(el("p",{class:"small-muted",style:"margin-top:18px"},"This is a frontend-only local profile. No password or server account is created."));
  return wrap;
}

/* ---------------- Generic helpers ---------------- */
function makeForm(title, fields, submitLabel){
  const card=el("div",{class:"form-card"});const form=el("form",{class:"campus-form"});
  card.appendChild(el("h3",{},title));
  fields.forEach(([name,label,type,placeholderOrOptions])=>{
    const id=`field-${name}-${Math.random().toString(36).slice(2,7)}`;
    let control;
    if(type==="textarea")control=el("textarea",{id,name,rows:"4",placeholder:placeholderOrOptions,required:"true"});
    else if(type==="select")control=el("select",{id,name,required:"true"},placeholderOrOptions.map(v=>el("option",{value:v},v)));
    else control=el("input",{id,name,type,placeholder:placeholderOrOptions,required:"true"});
    form.appendChild(el("label",{},[el("span",{},label),control]));
  });
  form.appendChild(el("button",{class:"btn btn-primary",type:"submit"},submitLabel));
  card.appendChild(form);return {card,form};
}

function recordCard({title,meta,text,status,count,button,action}){
  const card=el("article",{class:"record-card"},[
    el("div",{class:"record-main"},[el("h3",{},title),el("div",{class:"small-muted"},meta),el("p",{},text)]),
    el("div",{class:"record-side"},[
      el("span",{class:"status-pill"},status),
      count!==undefined?el("span",{class:"vote-count"},`${count} votes`):null,
      button?el("button",{class:"btn btn-small",type:"button",onclick:action},button):null
    ])
  ]);return card;
}

function toast(message,error=false){
  let t=document.querySelector(".campus-toast");if(t)t.remove();
  t=el("div",{class:`campus-toast${error?" error":""}`},message);document.body.appendChild(t);
  setTimeout(()=>t.remove(),3200);
}

function renderCredits(){
  const wrap=pageShell("Creator Credits","The people behind CAMPUS ONE.");
  contentOf(wrap).appendChild(el("div",{class:"credits-grid"},[
    ["Ankeetkesh Kumar","Lead Developer & UI Design"],
    ["Hemant Sharma","Development & Testing"],
    ["Nikita Sharma","Co-Developer & UI Design"],
    ["Pushpander","Content & Research"]
  ].map(([name,role])=>el("article",{class:"credit-card"},[el("h3",{},name),el("p",{},role)]))));
  return wrap;
}

function renderPlaceholder(title,desc,isPhase3=false){
  const wrap=pageShell(title,isPhase3?"Planned for Phase 3 — Student Community & Smart Features":"Ready for official data");
  contentOf(wrap).appendChild(el("div",{class:"placeholder"},[
    el("span",{class:"stamp"},isPhase3?"Coming in Phase 3":"Official data pending"),
    el("h3",{},title),el("p",{},desc)
  ]));return wrap;
}

function renderNotFound(){
  const wrap=pageShell("Page not found","");
  contentOf(wrap).appendChild(el("p",{},"That page doesn't exist. Use the navigation above to find your way back."));
  return wrap;
}

window.addEventListener("hashchange",navigate);
window.addEventListener("DOMContentLoaded",()=>{
  updateHeaderClock();
  clockTimer = setInterval(updateHeaderClock, 1000);
  navigate();
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  navToggle?.addEventListener("click",()=>{
    const open = navLinks?.classList.toggle("open") ?? false;
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks?.addEventListener("click", event=>{
    if (event.target.closest("a")) {
      navLinks.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
});
