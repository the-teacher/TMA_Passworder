import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import glob from "glob";
import { mergeDeep } from "./utils";
import type { LocaleObject } from "./utils";

/**
 * Script to generate locale schema files from all locale files in the project.
 *
 * Usage:
 * ```bash
 * # Generate schema files
 * > npx tsx src/i18n/generateLocaleSchema.ts
 *
 * # Add to build process in package.json
 * {
 *   "scripts": {
 *     "build": "yarn generate-locale-schema && vite build",
 *     "dev": "yarn generate-locale-schema && vite"
 *   }
 * }
 * ```
 *
 * File Structure:
 * ```
 * src/
 *   i18n/
 *     locales/
 *       en.json
 *       ru.json
 *     schema.en.json  <- generated
 *     schema.ru.json  <- generated
 *   components/
 *     ComponentName/
 *       __locales__/
 *         en.json
 *         ru.json
 * ```
 *
 * Example output schema.en.json:
 * ```json
 * {
 *   "translations": {
 *     "app": {
 *       "name": "HamsterPass",
 *       "settings": "Settings"
 *     }
 *   },
 *   "ComponentName": {
 *     "title": "Component Title",
 *     "description": "Component Description"
 *   }
 * }
 * ```
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateLocaleSchema = async () => {
  const resources: Record<string, LocaleObject> = {};

  const localeFiles = glob.sync(
    path.join(
      __dirname,
      "{locales/*.json,../components/**/__locales__/*.json}"
    ),
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

    const moduleData = JSON.parse(content) as LocaleObject;
    resources[lang] = mergeDeep(resources[lang], moduleData);
  }

  Object.entries(resources).forEach(([lang, data]) => {
    const schemaPath = path.join(__dirname, `locales.schema.${lang}.json`);
    fs.writeFileSync(schemaPath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`Generated locale schema for ${lang} at ${schemaPath}`);
  });
};

// Запускаем только если файл выполняется напрямую
if (require.main === module) {
  generateLocaleSchema().catch(console.error);
}
