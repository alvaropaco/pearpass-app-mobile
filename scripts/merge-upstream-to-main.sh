#!/bin/bash

# Script to merge upstream branches into main for all submodules
# - For submodules starting with 'pearpass': merges upstream/dev to main
# - For other submodules: merges upstream/main to main
# - Stops on merge conflicts for manual resolution
# Usage: ./scripts/merge-upstream-to-main.sh [submodule_name1] [submodule_name2] ...

set -e

# Get the root directory of the git repository
ROOT_DIR="$(git rev-parse --show-toplevel)"
TARGET_SUBMODULES=("$@")

if [ ${#TARGET_SUBMODULES[@]} -gt 0 ]; then
    echo "Merging upstream branches for specified submodules: ${TARGET_SUBMODULES[*]}..."
else
    echo "Merging upstream branches for all submodules..."
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
    
    # Determine which upstream branch to merge based on submodule name
    if [[ "$submodule_name" == pearpass* ]]; then
        upstream_branch="upstream/dev"
        echo "  📌 Pearpass submodule detected"
    else
        upstream_branch="upstream/main"
        echo "  📌 Non-pearpass submodule detected"
    fi
    
    echo "  ✓ Checking out main branch..."
    git checkout main 2>/dev/null || {
        echo "  ⚠️  Could not checkout main branch, skipping..."
        cd "$ROOT_DIR"
        echo ""
        continue
    }
    
    echo "  ✓ Attempting to merge $upstream_branch into main..."
    
    # Attempt merge and capture exit code
    if git merge "$upstream_branch" --no-edit; then
        echo "  ✅ Successfully merged $upstream_branch into main"
    else
        echo ""
        echo "  ❌ MERGE CONFLICT DETECTED!"
        echo "  Submodule: $submodule_name"
        echo "  Path: $path"
        echo "  Branch: $upstream_branch -> main"
        echo ""
        echo "Please resolve the conflicts manually:"
        echo "  cd $path"
        echo "  git status"
        echo "  # Fix conflicts, then:"
        echo "  git add ."
        echo "  git merge --continue"
        echo ""
        echo "After resolving, you can re-run this script to continue with remaining submodules."
        exit 1
    fi
    
    # Return to root directory
    cd "$ROOT_DIR"
    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All submodules processed successfully!"
