import fs from "fs";
import path from "path";
import glob from "glob";
import { mergeDeep } from "./utils.js";

/**
 * Script to generate locale schema files from all locale files in the project.
 * Searches for locale files only in __locales__ directories.
 *
 * Usage:
 * ```bash
 * # Generate schema files with source and output paths
 * > node generateLocaleSchema.js ./src ./dist/locales
 * ```
 */

const generateLocaleSchema = async (sourcePath, outputPath) => {
  if (!sourcePath || !outputPath) {
    throw new Error("Both sourcePath and outputPath are required");
  }

  const resources = {};
  const baseDir = process.cwd();

  const localeFiles = glob.sync(
    path.join(baseDir, sourcePath, "**/__locales__/*.json"),
    {
      absolute: true
    }
  );

  for (const filePath of localeFiles) {
    const content = fs.readFileSync(filePath, "utf-8");
    const lang = path.basename(filePath).match(/([a-z]{2})\.json$/)?.[1];

    if (!lang) continue;

    if (!resources[lang]) {
      resources[lang] = {};
    }

    const moduleData = JSON.parse(content);
    resources[lang] = mergeDeep(resources[lang], moduleData);
  }

  const fullOutputPath = path.join(baseDir, outputPath);

  // Create output directory if it doesn't exist
  if (!fs.existsSync(fullOutputPath)) {
    fs.mkdirSync(fullOutputPath, { recursive: true });
  }

  Object.entries(resources).forEach(([lang, data]) => {
    const schemaPath = path.join(fullOutputPath, `locales.schema.${lang}.json`);
    fs.writeFileSync(schemaPath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`Generated locale schema for ${lang} at ${schemaPath}`);
  });
};

// Example usage from command line:
// node generateLocaleSchema.js ./src ./dist/locales
if (process.argv[1] === process.argv[1]) {
  const [sourcePath, outputPath] = process.argv.slice(2);
  generateLocaleSchema(sourcePath, outputPath).catch(console.error);
}

export { generateLocaleSchema };
