import { profileData } from "./profile";

export const siteData = {
  title: `${profileData.name} — Portfolio`,
  description:
    "Yuanqian (Ayla) Liu — designer, engineer and researcher building apps, wearables and interactive prototypes. HCI & Information Science MSI at the University of Michigan.",
  email: "aylaliu@umich.edu",
  linkedInUrl: "https://www.linkedin.com/in/yuanqian-ayla-liu-845715430/",
  // Replace this URL to update every Resume link across the site.
  resumeUrl:
    "https://docs.google.com/document/d/1Cdk1QkprFvXTgIOdxF_tb1iHWII4W9JqXRwuA0wiBbU/preview",
  resumeLabel: "Resume",
  // Home footer, left to right: a status line that follows the Ann Arbor
  // clock (first matching entry wins; `from` is the hour the status starts,
  // 0–23), "Say hello" (mailto) and the live clock itself.
  footerTimeZone: "America/Detroit",
  footerStatuses: [
    { from: 0, text: "Night owl mode: shipping one more idea" },
    { from: 2, text: "Recharging; ideas queued for the morning" },
    { from: 7, text: "Probably on my first coffee" },
    { from: 9, text: "Probably vibe-coding" },
    { from: 12, text: "Probably sketching ideas over lunch" },
    { from: 14, text: "Probably bouncing between Figma and the terminal" },
    { from: 18, text: "Probably learning a new skill, just because" },
    { from: 21, text: "Probably collecting fun facts for no reason" },
  ],
  socialImagePath: "",
} as const;
