#!/bin/sh

PROMPT="$1"
TEMP_FILE="$OBSIDIAN_GIT_CREDENTIALS_INPUT"

cleanup() {
    rm -f "$TEMP_FILE" "$TEMP_FILE.response"
}
trap cleanup EXIT

echo "$PROMPT" > "$TEMP_FILE"

while [ ! -e "$TEMP_FILE.response" ]; do
    sleep 0.1
done

RESPONSE=$(cat "$TEMP_FILE.response")

echo "$RESPONSE"
