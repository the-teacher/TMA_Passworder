#!/bin/bash

#   EXAMLPE: source ./createProjectStructure.sh _Frontend/src/ _Frontend/examples/

# This script generates a complete tree-like directory and file structure of a given project,
# excluding commonly ignored directories like node_modules and yarn caches.
#
# Usage:
#   ./createProjectStructure.sh [scan_directory] [output_directory]
#
# Arguments:
#   scan_directory     - The root directory to scan.
#   output_directory   - The directory where the project structure file will be saved.

# Check if the correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 [scan_directory] [output_directory]"
    exit 1
fi

SCAN_DIR="$1"
OUTPUT_DIR="$2"
OUTPUT_FILE="$OUTPUT_DIR/project_structure.txt"

# Ensure the output directory exists
mkdir -p "$OUTPUT_DIR"

# Define ignored directories
IGNORED_DIRS=("node_modules" "yarn.lock" ".git" ".cache" ".next" "dist" "build")

# Function to generate tree structure recursively
generate_tree() {
    local dir="$1"
    local prefix="$2"
    local entries=("$dir"/*)
    local last_index=$((${#entries[@]} - 1))
    
    for i in "${!entries[@]}"; do
        local entry="${entries[$i]}"
        local name="$(basename "$entry")"
        
        # Skip ignored directories
        if [[ " ${IGNORED_DIRS[@]} " =~ " $name " ]]; then
            continue
        fi
        
        local connector="├──"
        if [[ "$i" -eq "$last_index" ]]; then
            connector="└──"
        fi
        
        echo "$prefix$connector $name" >> "$OUTPUT_FILE"
        
        if [[ -d "$entry" ]]; then
            generate_tree "$entry" "$prefix    "
        fi
    done
}

# Write root directory to the output file
echo "$SCAN_DIR/" > "$OUTPUT_FILE"
generate_tree "$SCAN_DIR" ""

echo "Project structure saved to $OUTPUT_FILE"

