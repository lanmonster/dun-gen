import Cell from "./cell/cell.ts";
import mulberry32 from "./rng/mulberry.ts";
import all_tiles from "./tile/all_tiles.ts";
import { Direction } from "./types.ts";
import random_in_range from "./util/random_in_range.ts";

type Neighbor = { index: number; direction: Direction };

export default class DunGen {
  #seed: number;
  #dimension: number;

  constructor(seed: number, dimension: number) {
    this.#seed = seed;
    this.#dimension = dimension;
  }

  generate(): Cell[] {
    const rng = mulberry32(this.#seed);
    const grid = Array.from(
      { length: (this.#dimension ) * (this.#dimension ) },
      () => new Cell(rng, [...Object.values(all_tiles)]),
    );
    const i = random_in_range(rng, { min: 0, max: grid.length });
    grid[i]?.collapse();
    this.propagate(grid, i);

    while (true) {
      const most_constrained_index = this.find_most_constrained(grid);
      if (most_constrained_index === -1) break;
      grid[most_constrained_index].collapse();
      this.propagate(grid, most_constrained_index);
    }

    return grid;
  }
  private find_most_constrained(grid: Cell[]): number {
    let min = Infinity;
    let min_index = -1;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].is_collapsed) continue;
      if (grid[i].entropy < min) {
        min = grid[i].entropy;
        min_index = i;
      }
    }
    return min_index;
  }

  private get_neighbors(index: number): Neighbor[] {
    const row = Math.floor(index / this.#dimension);
    const col = index % this.#dimension;
    return [
      {
        row: row - 1,
        col,
        direction: "NORTH" as Direction,
      },
      {
        row: row + 1,
        col,
        direction: "SOUTH" as Direction,
      },
      {
        row,
        col: col - 1,
        direction: "WEST" as Direction,
      },
      {
        row,
        col: col + 1,
        direction: "EAST" as Direction,
      },
    ].filter(({ row, col }) =>
      !(row < 0 || col < 0 || row >= this.#dimension || col >= this.#dimension)
    ).map(({ row, col, direction }) => ({
      index: (row * this.#dimension) + col,
      direction,
    }));
  }

  private propagate(grid: Cell[], from: number) {
    const neighbors = this.get_neighbors(from);
    const cell = grid[from];
    while (neighbors.length) {
      const { direction, index } = neighbors.shift()!;
      const did_constrain = grid[index].constrain(cell, direction);
      if (did_constrain) neighbors.push({ direction, index });
    }
  }
}

function to_rc(side_length: number, i: number): {r:number, c: number} {
    return {
        r: Math.floor(i / side_length),
        c: i % side_length
    }
}
function is_on_border(side_length: number, i: number): boolean {
    const {r,c} = to_rc(side_length, i)
    return (r === 0 || c === 0|| r ===side_length-1 || c === side_length - 1)
}
