#!/bin/bash

# Script to add copyright headers to source files
# Rock Spotter Copyright Header Updater

COPYRIGHT_HEADER="/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

"

echo "🔒 Adding copyright headers to Rock Spotter source files..."

# Function to add header to file if it doesn't exist
add_header() {
    local file="$1"
    if ! head -n 5 "$file" | grep -q "Copyright.*Rock Spotter"; then
        echo "Adding copyright to: $file"
        # Create temporary file with header + original content
        echo -n "$COPYRIGHT_HEADER" > temp_header.tmp
        cat "$file" >> temp_header.tmp
        mv temp_header.tmp "$file"
    fi
}

# Process JavaScript/JSX files (excluding node_modules and dist)
find . -name "*.js" -o -name "*.jsx" | grep -v node_modules | grep -v dist | while read file; do
    add_header "$file"
done

# Process theme files
find . -path "./mobile-app/src/theme/*.js" | while read file; do
    add_header "$file"
done

echo "✅ Copyright headers added to all source files"
echo "📋 Files updated with Rock Spotter copyright notice"