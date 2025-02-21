import weighted_random from "../rng/weighted_random.ts";
import Tile from "../tile/tile.ts";
import { Direction, RNG } from "../types.ts";

const OPPOSITES: Map<Direction, Direction> = new Map(
  [
    ["NORTH", "SOUTH"],
    ["SOUTH", "NORTH"],
    ["EAST", "WEST"],
    ["WEST", "EAST"],
  ],
);
export default class Cell {
  #rng: RNG;
  #options: Tile[];
  #neighbors: Partial<Record<Direction, Cell>>;
  constructor(rng: RNG, options: Tile[]) {
    if (options.length === 0) {
      throw new Error(`Cells must be created with at least one option`);
    }
    this.#neighbors = {};
    this.#rng = rng;
    this.#options = options;
  }

  get entropy(): number {
    return this.#options.length;
  }

  get is_collapsed(): boolean {
    return this.entropy <= 1;
  }

  add_neighbor(cell: Cell, direction: Direction) {
    this.#neighbors[direction] = cell;
  }

  neighbors(): [Direction, Cell][] {
    return Object.entries(this.#neighbors) as [Direction, Cell][];
  }

  render(): string {
    if (this.is_collapsed) {
      return this.#options[0].value;
    }
    return String(this.entropy);
  }

  options(): string[] {
    return this.#options.map((o) => o.value);
  }

  collapse() {
    const choice = weighted_random(
      this.#rng,
      this.#options.map((o) => o.weight),
    );
    this.#options = [
      this.#options[choice],
    ];
  }

  constrain(neighbor: Cell, direction: Direction): boolean {
    if (this.is_collapsed) return false;
    const neighbor_sockets = new Set(
      neighbor.#options.map((o) => o.socket(direction)),
    );
    const results = this.#options.filter((o) =>
      neighbor_sockets.has(o.socket(OPPOSITES.get(direction)!))
    );
    if (results.length === 0) {
      throw new Error("start again");
    }
    const did_constrain = results.length < this.#options.length;
    this.#options = results;
    return did_constrain;
  }
}
