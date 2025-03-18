#!/bin/bash

# source route-mover.sh src/libs/the-router/tests/test_actions/test

# Check if a directory path is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <directory_path>"
  exit 1
fi

DIRECTORY="$1"

# Check if the directory exists
if [ ! -d "$DIRECTORY" ]; then
  echo "Error: Directory '$DIRECTORY' does not exist."
  exit 1
fi

# Find all files matching the pattern {name}Action.ts in the given directory
find "$DIRECTORY" -maxdepth 1 -type f -name '*Action.ts' | while read -r file; do
  filename=$(basename "$file")
  name="${filename%Action.ts}"  # Remove "Action.ts" from the filename to get {name}

  # Ensure the extracted name is not empty
  if [ -n "$name" ]; then
    target_dir="$DIRECTORY/$name"

    # Create the target directory if it does not exist
    mkdir -p "$target_dir"

    # Move the file into the corresponding directory
    mv "$file" "$target_dir/"

    echo "Moved '$file' to '$target_dir/'"
  fi
done
