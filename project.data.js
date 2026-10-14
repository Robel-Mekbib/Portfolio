window.RHEM_PROJECTS = [
  {
    id: "aurora-ui",
    name: "Aurora UI",
    description:
      "A lightweight component library focused on motion and accessibility for modern web apps.",
    thumbnail: "", // leave empty for a gradient placeholder
    status: "in-development",
    tech: ["React", "TypeScript", "Framer Motion"],
    expectedLaunchDate: null, // no confirmed date — don't invent one
    published: true,
    details: {
      overview:
        "Aurora UI is a component system designed for teams who care about motion, accessibility, and clean defaults.",
      goals: [
        "Ship a WCAG-AA accessible component set",
        "Motion-first interactions with reduced-motion support",
        "Zero runtime dependencies beyond React",
      ],
      features: [
        "40+ primitives",
        "Dark / light theming",
        "Tree-shakeable exports",
      ],
      screenshots: [],
    },
  },
  {
    id: "studio-analytics",
    name: "Studio Analytics",
    description:
      "A private, privacy-first analytics dashboard for small studios and freelancers.",
    thumbnail: "",
    status: "coming-soon",
    tech: ["Next.js", "Postgres", "Tailwind"],
    expectedLaunchDate: "2026-03-01",
    published: true,
    details: {
      overview:
        "A simple, self-hostable analytics tool that doesn't sell your visitors' data.",
      goals: [
        "Cookie-free tracking",
        "Self-hostable in one command",
        "Human-readable reports",
      ],
      features: ["Realtime dashboard", "CSV export", "Email digests"],
      screenshots: [],
    },
  },
  {
    id: "rhem-motion",
    name: "Rhem Motion",
    description:
      "An experimental collection of scroll and cursor-driven interactions for portfolio sites.",
    thumbnail: "",
    status: "planning",
    tech: ["Vanilla JS", "GSAP"],
    expectedLaunchDate: null,
    published: true,
    details: {
      overview:
        "A playground of motion experiments, packaged as copy-paste snippets.",
      goals: ["Curated, tasteful motion", "Copy-paste friendly", "No build step"],
      features: ["Scroll reveals", "Magnetic cursors", "Parallax scenes"],
      screenshots: [],
    },
  },
];
