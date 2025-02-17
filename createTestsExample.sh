#!/bin/bash

# This script searches for all directories named __tests__ within the specified directory,
# finds all files matching the pattern *.test.tsx, and concatenates them into a single file.
# Each file's content is preceded by a comment with its relative path.
#
# Usage:
#   ./createTestsExample.sh [scan_directory] [output_directory]
#   EXAMLPE: source ./createTestsExample.sh _Frontend/src/ _Frontend/examples/
#
# Arguments:
#   scan_directory     - The root directory where __tests__ folders will be searched.
#   output_directory   - The directory where the concatenated file will be saved.

# Check if correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 [scan_directory] [output_directory]"
    exit 1
fi

SCAN_DIR="$1"
OUTPUT_DIR="$2"
OUTPUT_FILE="$OUTPUT_DIR/tests.example.tsx"

# Ensure the output directory exists
mkdir -p "$OUTPUT_DIR"

# Clear output file if it exists
> "$OUTPUT_FILE"

# Find and concatenate test files
find "$SCAN_DIR" -type d -name "__tests__" | while read -r test_dir; do
    find "$test_dir" -type f -name "*.test.tsx" | while read -r test_file; do
        # Get relative path
        REL_PATH="${test_file#$SCAN_DIR/}"
        echo "// $REL_PATH" >> "$OUTPUT_FILE"
        cat "$test_file" >> "$OUTPUT_FILE"
        echo -e "\n" >> "$OUTPUT_FILE"
    done
done

echo "Tests concatenated into $OUTPUT_FILE"
