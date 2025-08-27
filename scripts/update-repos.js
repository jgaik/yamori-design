#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const ORG = "jgaik"; // Change if your org is different
const REPOS = ["qr", "local-chess", "jgaik.github.io", "issued-recipes"];

const PACKAGES = ["styles", "react-components", "icons"];
const packagesDir = path.resolve("packages");

const versions = {};
PACKAGES.forEach((pkg) => {
  const pkgJsonPath = path.join(packagesDir, pkg, "package.json");
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  versions[`@yamori-design/${pkg}`] = `^${pkgJson.version}`;
});

console.log("Detected versions:", versions);

REPOS.forEach((repo) => {
  console.log(`\n🔄 Updating ${repo}...`);
  const repoUrl = `https://${process.env.GH_PAT}@github.com/${ORG}/${repo}.git`;
  const tempDir = path.join(os.tmpdir(), `update-${repo}-${Date.now()}`);

  execSync(`git clone --depth 1 ${repoUrl} ${tempDir}`);
  process.chdir(tempDir);

  const pkgPath = path.join(tempDir, "package.json");
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  let changed = false;

  for (const dep of Object.keys(versions)) {
    if (
      pkgJson.dependencies?.[dep] &&
      pkgJson.dependencies[dep] !== versions[dep]
    ) {
      pkgJson.dependencies[dep] = versions[dep];
      changed = true;
    }
    if (
      pkgJson.devDependencies?.[dep] &&
      pkgJson.devDependencies[dep] !== versions[dep]
    ) {
      pkgJson.devDependencies[dep] = versions[dep];
      changed = true;
    }
  }

  if (!changed) {
    console.log(`No updates needed for ${repo}. Skipping.`);
    return;
  }

  fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2) + "\n");
  execSync("npm install --package-lock-only");
  execSync("git add package.json package-lock.json || true");
  execSync(`git commit -m "chore: bump @yamori-design packages" || true`);
  execSync("git push origin main");

  console.log(`✅ Updated ${repo}`);
});

console.log("\n🎉 All done!");
