import type { ImageMetadata } from "astro";
import portrait from "../assets/projects/profile/headshot.png";

export const profileData = {
  name: "Yuanqian(Ayla) Liu",
  role: "UX Designer & Design Engineer",
  statement:
    "I design and prototype research-driven software experiences that make emerging technologies understandable, useful, and human.",
  approach:
    "My work moves between research, interaction design, and prototyping. I use research to identify the decisions that matter, design to make complex systems legible, and prototypes to test how an experience should feel—not only how it should look.",
  about: {
    heading: "Hi, I’m Yuanqian(Ayla).",
    body: "My interests span human–computer interaction (HCI), design engineering, and data visualization, with a focus on helping people understand complex information and make informed decisions.",
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
