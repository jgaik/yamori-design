#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPOS = ["qr", "local-chess", "jgaik.github.io", "issued-recipes"];

const ORG = "jgaik"; // Change if your org is different

// Read versions from package.jsons
const packagesDir = path.resolve("packages");
const yamoriPackages = ["styles", "react-components", "icons"];

const versions = {};
yamoriPackages.forEach((pkg) => {
  const pkgJsonPath = path.join(packagesDir, pkg, "package.json");
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  versions[`@yamori-design/${pkg}`] = pkgJson.version;
});

console.log("Detected versions:", versions);

REPOS.forEach((repo) => {
  console.log(`\n🔄 Updating ${repo}...`);
  const repoUrl = `https://${process.env.GH_PAT}@github.com/${ORG}/${repo}.git`;
  const tempDir = path.resolve(`tmp/${repo}`);

  // Clean up and clone
  execSync(`rm -rf ${tempDir}`);
  execSync(`git clone --depth 1 ${repoUrl} ${tempDir}`);
  process.chdir(tempDir);

  // Install deps and update versions
  const pkgPath = path.join(tempDir, "package.json");
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

  let changed = false;
  for (const dep of Object.keys(versions)) {
    if (pkgJson.dependencies?.[dep]) {
      pkgJson.dependencies[dep] = versions[dep];
      changed = true;
    }
    if (pkgJson.devDependencies?.[dep]) {
      pkgJson.devDependencies[dep] = versions[dep];
      changed = true;
    }
  }

  if (!changed) {
    console.log(`No yamori-design packages found in ${repo}. Skipping.`);
    process.chdir("../../");
    return;
  }

  fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2));
  console.log("📦 Updated package.json");

  // Install & push
  execSync("npm install --package-lock-only");
  execSync("git add package.json package-lock.json || true");
  execSync(`git commit -m "chore: bump @yamori-design packages" || true`);
  execSync("git push origin main");

  console.log(`✅ Updated ${repo}`);
  process.chdir("../../");
});

console.log("\n🎉 All done!");
