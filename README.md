# Dun-Gen
A dungeon generator based on Wave Function Collapse

## Dependencies
* Deno (installation instructions [here](https://docs.deno.com/runtime/getting_started/installation/))
* NPM (installation instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))

## How to run it
To get this project running, all you have to do is run the `./run.sh` script from
the root of the project.
This will:
* spin up the server in the background
* spin up the client in the background
* redirect output to their own files
* `tail` the logs together so you can view both logs at once

> NOTE: the script does not support windows, so if it does not "just work", you will have to manually start the server and client.

### Manually starting the server
Navigate to the `server` directory and run 
```
deno run dev
```

### Manually starting the client
Navigate to the `client` directory and run
```
npm run dev
```

## How it works
The generation is based on [Wave Function Collapse](https://github.com/mxgmn/WaveFunctionCollapse/tree/master).
You supply:
* a tileset
* rules for which tiles can connect to which others


(You can find the tileset for this project in `./tiles/all_tiles.ts`)

Then, a grid is filled with each cell having all of the tiles as an option that it could be.

The algorithm is as follows:
1. choose a random index to "collapse" the possibilities down to a single possibility by choosing at random.
2. propagate that constraint to neighbors until there is no effect
3. choose cell with the lowest "entropy" (fewest possibilities)
4. collapse
5. propagate
6. if there are cells that are not collapsed: go to step 3, otherwise stop



