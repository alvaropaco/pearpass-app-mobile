#!/bin/bash

# Script to version bump all submodules
# - Pulls latest main branch
# - Runs npm version patch
# - Pushes changes with tags
# Usage: ./scripts/version-bump-submodules.sh [submodule_name1] [submodule_name2] ...

set -e

# Get the root directory of the git repository
ROOT_DIR="$(git rev-parse --show-toplevel)"
TARGET_SUBMODULES=("$@")

if [ ${#TARGET_SUBMODULES[@]} -gt 0 ]; then
    echo "Version bumping specified submodules: ${TARGET_SUBMODULES[*]}..."
else
    echo "Version bumping all submodules..."
fi
echo ""

# Parse .gitmodules and process each submodule
git config --file .gitmodules --get-regexp path | while read -r key path; do
    # Extract submodule name from path
    submodule_name=$(basename "$path")
    
    # Filter if specific submodules are requested
    if [ ${#TARGET_SUBMODULES[@]} -gt 0 ]; then
        should_process=false
        for target in "${TARGET_SUBMODULES[@]}"; do
            if [[ "$submodule_name" == "$target" ]]; then
                should_process=true
                break
            fi
        done
        
        if [ "$should_process" = false ]; then
            continue
        fi
    fi
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Processing submodule: $submodule_name"
    echo "  Path: $path"
    
    # Change to submodule directory
    cd "$ROOT_DIR/$path"
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        echo "  ⚠️  No package.json found, skipping..."
        cd "$ROOT_DIR"
        echo ""
        continue
    fi
    
    echo "  ✓ Checking out main branch..."
    git checkout main 2>/dev/null || {
        echo "  ⚠️  Could not checkout main branch, skipping..."
        cd "$ROOT_DIR"
        echo ""
        continue
    }
    
    echo "  ✓ Pulling latest changes from origin/main..."
    git pull origin main || {
        echo "  ⚠️  Could not pull from origin/main, skipping..."
        cd "$ROOT_DIR"
        echo ""
        continue
    }
    
    echo "  ✓ Running npm version patch..."
    npm version patch || {
        echo "  ❌ Failed to run npm version patch"
        echo "  Please check the submodule manually: $path"
        exit 1
    }
    
    echo "  ✓ Pushing changes and tags to origin..."
    git push origin main --tags || {
        echo "  ❌ Failed to push changes and tags"
        echo "  Please check the submodule manually: $path"
        exit 1
    }
    
    # Get the new version
    new_version=$(node -p "require('./package.json').version")
    echo "  ✅ Successfully bumped to version $new_version"
    
    # Return to root directory
    cd "$ROOT_DIR"
    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All submodules processed successfully!"
