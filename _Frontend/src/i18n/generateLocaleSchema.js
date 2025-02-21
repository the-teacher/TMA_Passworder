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
  console.log("Starting locale schema generation...");
  console.log(`Source path: ${sourcePath}`);
  console.log(`Output path: ${outputPath}`);

  if (!sourcePath || !outputPath) {
    const error = new Error("Both sourcePath and outputPath are required");
    console.error(error.message);
    throw error;
  }

  try {
    const resources = {};
    const baseDir = process.cwd();
    console.log(`Base directory: ${baseDir}`);

    const pattern = path.join(baseDir, sourcePath, "**/__locales__/*.json");
    console.log(`Looking for locale files with pattern: ${pattern}`);

    const localeFiles = glob.sync(pattern, {
      absolute: true
    });

    console.log(`Found locale files:`, localeFiles);

    for (const filePath of localeFiles) {
      console.log(`Processing file: ${filePath}`);
      const content = fs.readFileSync(filePath, "utf-8");
      const lang = path.basename(filePath).match(/([a-z]{2})\.json$/)?.[1];

      if (!lang) {
        console.log(`Skipping file ${filePath} - no language code found`);
        continue;
      }

      console.log(`Found language: ${lang}`);

      if (!resources[lang]) {
        resources[lang] = {};
      }

      const moduleData = JSON.parse(content);
      resources[lang] = mergeDeep(resources[lang], moduleData);
    }

    const fullOutputPath = path.join(baseDir, outputPath);
    console.log(`Full output path: ${fullOutputPath}`);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(fullOutputPath)) {
      console.log(`Creating output directory: ${fullOutputPath}`);
      fs.mkdirSync(fullOutputPath, { recursive: true });
    }

    Object.entries(resources).forEach(([lang, data]) => {
      const schemaPath = path.join(
        fullOutputPath,
        `locales.schema.${lang}.json`
      );
      console.log(`Writing schema for ${lang} to: ${schemaPath}`);
      fs.writeFileSync(schemaPath, JSON.stringify(data, null, 2), "utf-8");
      console.log(`Successfully generated locale schema for ${lang}`);
    });

    console.log("Locale schema generation completed!");
  } catch (error) {
    console.error("Error during schema generation:", error);
    throw error;
  }
};

// If run directly not imported
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const [, , sourcePath, outputPath] = process.argv;
  generateLocaleSchema(sourcePath, outputPath)
    .then(() => console.log("Done!"))
    .catch((error) => {
      console.error("Failed:", error);
      process.exit(1);
    });
}

export { generateLocaleSchema };
