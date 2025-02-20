import all_tiles from "../tile/all_tiles.ts";
import Tile from "../tile/tile.ts";
import { Direction, RNG } from "../types.ts";
import random_in_range from "../util/random_in_range.ts";

export default class Cell {
  #rng: RNG;
  #options: Tile[];
  constructor(rng: RNG,  options: Tile[]) {
    if (options.length === 0) {
      throw new Error(`Cells must be created with at least one option`);
    }
    this.#rng = rng;
    this.#options = options;
  }
  get entropy(): number {
    return this.#options.length;
  }
  get is_collapsed(): boolean {
    return this.entropy === 1;
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
    const choice = random_in_range(this.#rng, {
      min: 0,
      max: this.#options.length - 1,
    });
       this.#options = [
      this.#options.length === 0 ? all_tiles.blank : this.#options[choice],
    ];
  }
  constrain(cell: Cell, direction: Direction): boolean {
    const results = [];
    if (cell.#options.length === 0) {
      throw new Error(`cell has no options!`);
    }
    if (this.#options.length === 0) {
      //throw new Error(`I have no options!`);
    }
    for (const option of this.#options) {
      for (const cell_option of cell.#options) {
        if (cell_option.fits(option, direction)) {
          results.push(option);
        }
      }
    }
    const did_constrain = results.length < this.#options.length;
    this.#options = results;
    return did_constrain;
  }
}
