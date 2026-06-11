import * as fs from "fs";
import * as path from "path";

function walkDir(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function searchLeaflet() {
  const srcDir = path.join(process.cwd(), "src");
  const files = walkDir(srcDir);
  const matchedFiles: string[] = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    if (
      content.includes("leaflet") ||
      content.includes("TileLayer") ||
      content.includes("MapContainer") ||
      content.includes("Marker") ||
      content.includes("nominatim") ||
      content.includes("openstreetmap")
    ) {
      // Exclude files we know are already migrated but might have comments,
      // or check if they still contain actual leaflet code.
      if (
        content.includes("import L from") ||
        content.includes("import * as L from") ||
        content.includes("L.map") ||
        content.includes("L.Icon") ||
        content.includes("L.marker") ||
        content.includes("openstreetmap.org") ||
        content.includes("TileLayer")
      ) {
        matchedFiles.push(file);
      }
    }
  }

  console.log("Found remaining Leaflet map files:", matchedFiles);
}

searchLeaflet();
