#!/bin/bash

pushd server
deno run dev > ../server.log 2>&1 &
popd

pushd client
npm run dev > ../client.log 2>&1 &
popd

trap "printf \"\nstopping client\" && fuser -k 3000/tcp ; printf \"\nstopping server\n\" && fuser -k 8000/tcp" SIGINT
tail -f server.log client.log
