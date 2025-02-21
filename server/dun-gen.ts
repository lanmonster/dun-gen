import Cell from "./cell/cell.ts";
import all_tiles from "./tile/all_tiles.ts";
import { Direction, RNG } from "./types.ts";
import random_in_range from "./util/random_in_range.ts";

type Neighbor = { index: number; direction: Direction };

export default class DunGen {
  #tries: number;
  #dimension: number;

  constructor(dimension: number) {
    this.#tries = 0;
    this.#dimension = dimension;
  }

  generate(rng: RNG): Cell[] {
    this.#tries++;
    const grid = Array.from(
      { length: (this.#dimension) * (this.#dimension) },
      (_, i) =>
        new Cell(
          rng,
          is_on_border(this.#dimension, i)
            ? [all_tiles.blank]
            : Object.values(all_tiles),
        ),
    );
    grid.forEach((c, i) => {
      this.get_neighbors(i).forEach(({ index, direction }) => {
        c.add_neighbor(grid[index], direction);
      });
    });
    grid.forEach((c) => this.propagate(c));

    const i = random_in_range(rng, { min: 0, max: grid.length });
    grid[i].collapse();
    this.propagate(grid[i]);

    while (true) {
      const lowest_entropy_index = this.find_lowest_entropy(grid);
      if (lowest_entropy_index === -1) break;
      grid[lowest_entropy_index].collapse();
      this.propagate(grid[lowest_entropy_index]);
    }

    return grid;
  }

  private find_lowest_entropy(grid: Cell[]): number {
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
    const { r: row, c: col } = to_rc(this.#dimension, index);
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

  private propagate(cell: Cell) {
    const stack = [cell];
    while (stack.length > 0) {
      const cell = stack.pop()!;
      cell?.neighbors().forEach((
        [direction, neighbor],
      ) => {
        if (neighbor.is_collapsed) return;
        const did_constrain = neighbor.constrain(cell, direction);
        if (did_constrain) stack.push(neighbor);
      });
    }
  }
}

function to_rc(side_length: number, i: number): { r: number; c: number } {
  return {
    r: Math.floor(i / side_length),
    c: i % side_length,
  };
}
function is_on_border(side_length: number, i: number): boolean {
  const { r, c } = to_rc(side_length, i);
  return (r === 0 || c === 0 || r === side_length - 1 || c === side_length - 1);
}
