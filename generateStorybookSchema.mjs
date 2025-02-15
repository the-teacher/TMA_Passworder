import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Quick start:
// node generateStorybookSchema.mjs _Frontend/src/ _Frontend/.storybook/

/**
 * This script generates a structured schema of Storybook stories from a specified directory.
 * It scans for files with extensions .stories.tsx, .stories.jsx, .stories.js, and .stories.ts,
 * extracts the story titles and exports, and formats them into a hierarchical structure.
 *
 * The output is a markdown file that represents the structure of your Storybook stories,
 * organized by categories and components, and sorted alphabetically.
 *
 * Usage:
 * node generateStorybookSchema.mjs <relative_path_to_stories_directory> <relative_path_to_output_file_or_directory>
 *
 * Example:
 * node generateStorybookSchema.mjs ../src ../.storybook/storybook-schema.md
 *
 * If the output path is a directory, the script will create a file named 'storybook-schema.md' in that directory.
 */

// Get the directory paths from command line arguments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storiesDir = path.resolve(__dirname, process.argv[2] || '../src'); // Default to '../src' if not provided
let outputFilePath = path.resolve(
  __dirname,
  process.argv[3] || '../.storybook/storybook-schema.md'
);

// If the output path is a directory, append the default filename
if (
  fs.existsSync(outputFilePath) &&
  fs.statSync(outputFilePath).isDirectory()
) {
  outputFilePath = path.join(outputFilePath, 'storybook-schema.md');
}

function getStoryFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getStoryFiles(filePath, fileList);
    } else if (
      file.endsWith('.stories.tsx') ||
      file.endsWith('.stories.jsx') ||
      file.endsWith('.stories.js') ||
      file.endsWith('.stories.ts')
    ) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function parseStoryFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  const exportsMatch = content.match(/export const (\w+):/g);

  if (titleMatch && exportsMatch) {
    const title = titleMatch[1];
    const exports = exportsMatch.map((exp) =>
      exp.split(' ')[2].replace(':', '')
    );
    return { title, exports };
  }

  return null;
}

function buildSchema(storyFiles) {
  const schema = {};

  storyFiles.forEach((file) => {
    const storyData = parseStoryFile(file);
    if (storyData) {
      const { title, exports } = storyData;
      const [category, component] = title.split('/');

      if (!schema[category]) {
        schema[category] = {};
      }

      if (!schema[category][component]) {
        schema[category][component] = [];
      }

      schema[category][component].push(...exports);
    }
  });

  return schema;
}

function formatSchema(schema) {
  let formattedSchema = '# Storybook Structure Schema\n\n```\n';

  // Sort categories and components
  const sortedCategories = Object.keys(schema).sort();
  sortedCategories.forEach((category) => {
    formattedSchema += `${category}/\n`;

    const sortedComponents = Object.keys(schema[category]).sort();
    sortedComponents.forEach((component) => {
      formattedSchema += `├── ${component}/\n`;

      schema[category][component].forEach((story, index, array) => {
        const isLast = index === array.length - 1;
        formattedSchema += `│   ${isLast ? '└──' : '├──'} ${story}\n`;
      });

      formattedSchema += '│\n';
    });
  });

  formattedSchema += '```\n';
  return formattedSchema;
}

function writeSchemaToFile(schema) {
  fs.writeFileSync(outputFilePath, schema, 'utf-8');
}

const storyFiles = getStoryFiles(storiesDir);
const schema = buildSchema(storyFiles);
const formattedSchema = formatSchema(schema);
writeSchemaToFile(formattedSchema);

console.log('Storybook schema generated successfully!');
