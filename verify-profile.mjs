import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");

for (const text of [
  "Backend Engineer.<br>Applied AI for Fintech and Regulated Systems.",
  "I publish selected architecture, testing and project evidence only after it has passed an independent-build review.",
  "Selected projects",
  "https://lockin.quinson.dev/",
  "https://freddiequinson.github.io/ordarides/",
  "https://github.com/freddiequinson/Pomodoro-Play",
  "https://github.com/freddiequinson/Go-Shop",
]) {
  assert(html.includes(text), `Required reviewed copy is missing: ${text}`);
}

for (const forbidden of [
  "BrightOmari",
  "omariomari2",
  "brigdethe",
  "phone-contact",
  "Cloud Engineer",
  "Kibo University",
  "Ayawaso Central Municipal Assembly",
  "Tysson Electronics",
  "Founder & Product Lead",
  "Automated Call Center with AWS Connect",
  "Bank Bot with AWS Lex",
  "Website Vulnerability Scanner",
  "Words Per Minute",
  "Food Commerce Site",
  "Senior Developer, Maddy Group",
  "Research and Data Analyst, National Communications Authority",
  "Technical Lead, CMC",
  "Technology Consultant, CMC",
]) {
  assert(!html.includes(forbidden), `Private, stale or unsupported copy remains: ${forbidden}`);
}

assert(!/href=["']tel:/i.test(html), "A telephone link remains public.");
assert(!/\b(?:\+?233|0)2\d{8}\b/.test(html), "A Ghana mobile number remains public.");

for (const anchor of html.match(/<a\b[^>]*target=["']_blank["'][^>]*>/gi) ?? []) {
  assert(/rel=["'][^"']*noopener[^"']*noreferrer[^"']*["']/i.test(anchor),
    `External new-tab link lacks isolation: ${anchor.slice(0, 120)}`);
}

console.log("Portfolio public-boundary checks passed.");
