export type ExperienceEntry = {
  year: string;
  role: string;
  org: string;
  description: string;
  tags: string[];
};

export type ProjectEntry = {
  year: string;
  title: string;
  href?: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
};

export type ArchiveEntry = {
  year: string;
  title: string;
  tech: string;
  href?: string;
  linkLabel?: string;
};

export const experience: ExperienceEntry[] = [
  {
    year: "2025",
    role: "Digital & Technology Services Intern",
    org: "Alvarez and Marsal",
    description:
      "Evaluated and pitched digital initiatives for a £2B+ revenue client. Delivered data-driven insights using clustering and segmentation, supported with data analysis, feature engineering, and embedding techniques.",
    tags: ["Python", "Data Science", "Clustering", "Strategy"],
  },
  {
    year: "2024",
    role: "Product Engineer",
    org: "Humanising Autonomy",
    description:
      "Ethical-AI startup in automotive sector. Produced competitor and market-trend reports, and identified & prioritised key B2B clients to drive revenue.",
    tags: ["Product", "Market Research", "B2B"],
  },
  {
    year: "2023",
    role: "Summer Analyst",
    org: "Beacon Capital",
    description:
      "VC firm backing early-stage enterprise SaaS. Led data operations to source promising startups aligned with the investment thesis and built founder relationships.",
    tags: ["Data Analysis", "Sourcing", "Research"],
  },
  {
    year: "2022",
    role: "Data Scientist",
    org: "TBC Bank",
    description:
      "Built and presented an XGBoost pipeline to predict employee churn end-to-end — cleaning, feature engineering, validation.",
    tags: ["Python", "ML", "XGBoost"],
  },
];

export const projects: ProjectEntry[] = [
  {
    year: "2025",
    title: "OAM Inter-Satellite Optical Links",
    description:
      "MEng project, in collaboration with Boeing: an end-to-end simulation of orbital angular momentum (OAM) multiplexing for free-space optical inter-satellite links. Modelled Laguerre–Gaussian beam propagation, pointing jitter, and mode crosstalk over 50–250 km, with a coherent sparse-aperture-array receiver and Monte Carlo BER/capacity analysis validated against published results and a spiral-phase-plate bench experiment.",
    tags: ["Python", "NumPy/SciPy", "Monte Carlo", "Photonics", "Simulation"],
    image: "/images/oam-lg-beam.png",
    imageAlt:
      "Simulated Laguerre–Gaussian OAM mode: ring-shaped intensity profile alongside its spiral phase.",
  },
  {
    year: "2025",
    title: "Sudoku Solver",
    href: "https://github.com/Tokoavaliani/Sudoku-Solver",
    description:
      "A webapp that digitises a printed Sudoku puzzle through OpenCV, solves it with a recursive backtracking algorithm, and provides corrections and LLM-powered hints.",
    tags: ["Python", "OpenCV", "Algorithms", "LLMs"],
  },
  {
    year: "2025",
    title: "Caius Padel Ranking",
    href: "https://github.com/Tokoavaliani/caius-padel-ranking",
    description:
      "An Elo-based ranking system and player dashboard for Gonville & Caius College padel society.",
    tags: ["Python", "Algorithms", "DB Management"],
  },
  {
    year: "2024",
    title: "Blackjack",
    href: "https://github.com/Tokoavaliani/Blackjack",
    description:
      "PyQt web app for learning blackjack basic strategy and card counting, with realistic game mechanics",
    tags: ["Python", "Simulation", "GUI design"],
  },
  {
    year: "2023",
    title: "IDP — Autonomous Robot",
    href: "https://www.youtube.com/watch?v=33eCCn5jYRU",
    description:
      "An autonomous line following robot that collects and sort blocks by colour.",
    tags: ["C++", "Arduino", "Robotics"],
  },
  {
    year: "2022",
    title: "Meal Booking Bot",
    href: "https://github.com/Tokoavaliani/meal-booking-bot",
    description:
      "An automated meal-booking bot to guarantee me a place at in demand college events.",
    tags: ["Python", "Automation", "Multiprocessing"],
  },
];

export const archive: ArchiveEntry[] = [
  {
    year: "2025",
    title: "Sudoku Solver",
    tech: "Python · Computer Vision",
    href: "https://github.com/Tokoavaliani/Sudoku-Solver",
    linkLabel: "Code ↗",
  },
  {
    year: "2025",
    title: "Caius Padel Ranking",
    tech: "Python · Elo · Data",
    href: "https://github.com/Tokoavaliani/caius-padel-ranking",
    linkLabel: "Code ↗",
  },
  {
    year: "2025",
    title: "Blackjack",
    tech: "Python · Simulation · Probability",
    href: "https://github.com/Tokoavaliani/Blackjack",
    linkLabel: "Code ↗",
  },
  {
    year: "2023",
    title: "IDP — Autonomous Robot",
    tech: "C++ · Arduino · Robotics",
    href: "https://www.youtube.com/watch?v=33eCCn5jYRU",
    linkLabel: "Video ↗",
  },
  { year: "2023", title: "Data Science", tech: "Python · Fourier Analysis" },
  { year: "2023", title: "Device Programming", tech: "C++ · I²C · Interrupts" },
  {
    year: "2022",
    title: "“Sustainable Engineering” Poster",
    tech: "Comms · Smart Grid",
    href: "/documents/Sustainable-engineering-poster.pdf",
    linkLabel: "PDF ↗",
  },
  {
    year: "2022",
    title: "Earthquake-Resistant Structures",
    tech: "Python · Vibration Sim",
    href: "/documents/127_ta503_VIBR_multipleabsorbers.pdf",
    linkLabel: "Report ↗",
  },
  {
    year: "2022",
    title: "Meal Booking Bot",
    tech: "Python · requests · Multiprocessing",
    href: "https://github.com/Tokoavaliani/meal-booking-bot",
    linkLabel: "Code ↗",
  },
  { year: "2022", title: "Mars Lander Simulator", tech: "C++ · Control Theory" },
  { year: "2022", title: "Product Design", tech: "Design Process" },
  {
    year: "2022",
    title: "Integrated Electrical Project",
    tech: "Electronics · LTSpice",
    href: "https://www.youtube.com/watch?v=HIDArrAtTYE",
    linkLabel: "Video ↗",
  },
  { year: "2022", title: "Engineering Drawings", tech: "Technical Drawing" },
  {
    year: "2022",
    title: "Flood Warning System",
    tech: "Python · Data Structures",
    href: "https://github.com/KaneZhao25/Flood_risk_project_83",
    linkLabel: "Code ↗",
  },
  { year: "2021", title: "SolidWorks Rollercoaster", tech: "CAD · Motion Analysis" },
  {
    year: "2021",
    title: "Engineer in Society",
    tech: "Essay · Ethics of AVs",
    href: "/documents/Toko%20Avaliani%20-%20Engineering%20in%20society.pdf",
    linkLabel: "Essay ↗",
  },
  {
    year: "2021",
    title: "Structural Design Project",
    tech: "CAD · Structural Analysis",
    href: "https://www.youtube.com/watch?v=bRULRWLsXm0",
    linkLabel: "Video ↗",
  },
];
