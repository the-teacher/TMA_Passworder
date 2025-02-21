# Frontend Generators

This directory contains utility scripts for generating documentation and examples from your frontend codebase.

## Available Generators

### Project Structure Generator (`createProjectStructure.sh`)

Creates a tree-like representation of your project's directory structure, excluding common directories like `node_modules`, `.git`, etc.

```bash
source ./createProjectStructure.sh [scan_directory] [output_directory]
```

Example:

```bash
source ./createProjectStructure.sh _Frontend/src/ _Frontend/examples/
```

Output: Creates `project_structure.txt` in the specified output directory.

### Stories Example Generator (`createStoriesExample.sh`)

Collects and concatenates all Storybook stories (`.stories.tsx` files) from `__stories__` directories into a single example file.

```bash
source ./createStoriesExample.sh [scan_directory] [output_directory]
```

Example:

```bash
source ./createStoriesExample.sh _Frontend/src/ _Frontend/examples/
```

Output: Creates `stories.example.tsx` containing all stories with their relative paths as comments.

### Tests Example Generator (`createTestsExample.sh`)

Collects and concatenates all test files (`.test.tsx` files) from `__tests__` directories into a single example file.

```bash
source ./createTestsExample.sh [scan_directory] [output_directory]
```

Example:

```bash
source ./createTestsExample.sh _Frontend/src/ _Frontend/examples/
```

Output: Creates `tests.example.tsx` containing all tests with their relative paths as comments.

## Common Usage

These generators are useful for:

- Documentation purposes
- Creating example files for reference
- Understanding project structure
- Sharing code examples with team members

## Arguments

Each generator takes two required arguments:

1. `scan_directory` - The root directory to scan for files
2. `output_directory` - The directory where generated files will be saved

## Output Files

- `project_structure.txt` - Complete tree structure of your project
- `stories.example.tsx` - Concatenated Storybook stories
- `tests.example.tsx` - Concatenated test files

## Ignored Directories

The project structure generator automatically ignores common directories:

- node_modules
- .git
- .cache
- .next
- dist
- build
- yarn.lock

## Notes

- The scripts will create the output directory if it doesn't exist
- Existing output files will be overwritten
- Each file in the concatenated output includes its relative path as a comment
- All scripts use bash and should be run in a Unix-like environment
