#!/bin/bash
TARGETS=(
"x86_64-pc-windows-msvc"
"x86_64-apple-darwin"
"aarch64-apple-darwin"
"x86_64-unknown-linux-gnu"
"aarch64-unknown-linux-gnu"
)

for t in ${TARGETS[@]}; do
    PLATFORM=$(echo $t | cut -d"-" -f 3)
    ARCH=$(echo $t | cut -d"-" -f 1)
    deno compile --target $t -o server-$PLATFORM-$ARCH --allow-net main.ts
done
