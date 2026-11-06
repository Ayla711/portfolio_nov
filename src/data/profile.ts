import type { ImageMetadata } from "astro";
import portrait from "../assets/projects/profile/headshot.png";

export const profileData = {
  name: "Yuanqian(Ayla) Liu",
  role: "UX Designer & Design Engineer",
  statement:
    "I work across design, engineering and research — building apps, wearables and interactive prototypes, and studying how people actually use them.",
  approach:
    "My work moves between research, interaction design, and prototyping. I use research to identify the decisions that matter, design to make complex systems legible, and prototypes to test how an experience should feel—not only how it should look.",
  about: {
    heading: "Hi, I’m Yuanqian (Ayla).",
    // Second line of About Me: field | linked programme.
    field: "HCI & Information Science",
    program: {
      label: "MSI @UMich",
      url: "https://www.si.umich.edu/programs/master-science-information",
    },
    // Replace the imported photo above to update the sidebar portrait.
    portrait: portrait as ImageMetadata | undefined,
    portraitAlt: "Yuanqian(Ayla) Liu smiling in a portrait.",
    portraitPosition: "50% 50%",
  },
  capabilities: {
    research: ["User Interviews", "Synthesis", "User Testing"],
    design: ["Interaction Design", "Information Architecture", "UX/UI Design"],
    build: [
      "Interactive Prototyping",
      "Creative Coding",
      "Experience Simulation",
    ],
  },
} as const;
