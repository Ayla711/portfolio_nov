import { profileData } from "./profile";

export const siteData = {
  title: `${profileData.name} — Portfolio`,
  description:
    "Research-driven software experiences that make emerging technologies understandable, useful, and human.",
  email: "711ayla711@gmail.com",
  linkedInUrl: "https://www.linkedin.com/in/yuanqian-ayla-liu-845715430/",
  // Replace this URL to update every Resume link across the site.
  resumeUrl:
    "https://docs.google.com/document/d/1Cdk1QkprFvXTgIOdxF_tb1iHWII4W9JqXRwuA0wiBbU/edit?tab=t.0",
  resumeLabel: "Resume",
  socialImagePath: "",
} as const;
