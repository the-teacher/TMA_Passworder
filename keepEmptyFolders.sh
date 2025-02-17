#!/bin/bash

# This script searches for directories named __tests__ and __stories__
# within the specified directory (or current directory if not provided),
# checks if they are empty, and creates a .keep file if they are.
#
# Usage:
#   ./keepEmptyFolders.sh [directory]
#   EXAMPLE: source ./keepEmptyFolders.sh _Frontend/src/
#   If no directory is specified, the current directory is used.

# Set the base directory (default to current directory if not provided)
BASE_DIR="${1:-.}"

# Find all directories named __tests__ and __stories__
find "$BASE_DIR" -type d \( -name "__tests__" -o -name "__stories__" \) | while read -r dir; do
    # Check if the directory is empty
    if [ -z "$(ls -A "$dir" 2>/dev/null)" ]; then
        # Create .keep file if the directory is empty
        touch "$dir/.keep"
        echo "Created .keep in $dir"
    fi
done
