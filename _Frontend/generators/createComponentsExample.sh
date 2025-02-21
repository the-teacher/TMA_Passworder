#!/bin/bash

# EXAMPLE: source ./createComponentsExample.sh _Frontend/src/ _Frontend/examples/

# This script searches for all React component files (*.tsx) within the specified directory,
# excluding test, story, and type files, and concatenates them into a single file.
# Each file's content is preceded by a comment with its relative path.
#
# Usage:
#   ./createComponentsExample.sh [scan_directory] [output_directory]
#
# Arguments:
#   scan_directory     - The root directory where React components will be searched.
#   output_directory   - The directory where the concatenated file will be saved.

# Check if correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 [scan_directory] [output_directory]"
    exit 1
fi

SCAN_DIR="$1"
OUTPUT_DIR="$2"
OUTPUT_FILE="$OUTPUT_DIR/components.example.tsx"

# Ensure the output directory exists
mkdir -p "$OUTPUT_DIR"

# Clear output file if it exists
> "$OUTPUT_FILE"

# Find and concatenate component files
# Excluding test files, story files, type files, and files in __tests__ and __stories__ directories
find "$SCAN_DIR" -type f -name "*.tsx" \
  ! -name "*.test.tsx" \
  ! -name "*.stories.tsx" \
  ! -name "*.types.tsx" \
  ! -path "*/\__tests__/*" \
  ! -path "*/\__stories__/*" \
  ! -path "*/node_modules/*" \
  | while read -r component_file; do
    # Get relative path
    REL_PATH="${component_file#$SCAN_DIR/}"
    echo "// $REL_PATH" >> "$OUTPUT_FILE"
    cat "$component_file" >> "$OUTPUT_FILE"
    echo -e "\n" >> "$OUTPUT_FILE"
done

echo "Components concatenated into $OUTPUT_FILE"
