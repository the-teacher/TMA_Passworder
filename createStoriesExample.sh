#!/bin/bash

# This script searches for all directories named __stories__ within the specified directory,
# finds all files matching the pattern *.stories.tsx, and concatenates them into a single file.
# Each file's content is preceded by a comment with its relative path.
#
# Usage:
#   ./createStoriesExample.sh [scan_directory] [output_directory]
#   EXAMLPE: source ./createStoriesExample.sh _Frontend/src/ _Frontend/examples/
#
# Arguments:
#   scan_directory     - The root directory where __stories__ folders will be searched.
#   output_directory   - The directory where the concatenated file will be saved.

# Check if correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 [scan_directory] [output_directory]"
    exit 1
fi

SCAN_DIR="$1"
OUTPUT_DIR="$2"
OUTPUT_FILE="$OUTPUT_DIR/stories.example.tsx"

# Ensure the output directory exists
mkdir -p "$OUTPUT_DIR"

# Clear output file if it exists
> "$OUTPUT_FILE"

# Find and concatenate storybook files
find "$SCAN_DIR" -type d -name "__stories__" | while read -r story_dir; do
    find "$story_dir" -type f -name "*.stories.tsx" | while read -r story_file; do
        # Get relative path
        REL_PATH="${story_file#$SCAN_DIR/}"
        echo "// $REL_PATH" >> "$OUTPUT_FILE"
        cat "$story_file" >> "$OUTPUT_FILE"
        echo -e "\n" >> "$OUTPUT_FILE"
    done
done

echo "Stories concatenated into $OUTPUT_FILE"
