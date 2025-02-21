import { Direction, InclusiveRange, NaryTuple } from "../types.ts";

const OPPOSITES: Map<Direction, Direction> = new Map(
  [
    ["NORTH", "SOUTH"],
    ["SOUTH", "NORTH"],
    ["EAST", "WEST"],
    ["WEST", "EAST"],
  ],
);

function direction_to_index(direction: Direction): InclusiveRange<0, 3> {
  switch (direction) {
    case "NORTH":
      return 0;
    case "EAST":
      return 1;
    case "SOUTH":
      return 2;
    case "WEST":
      return 3;
    default:
      throw new Error(
        `Unrecognized direction: ${direction satisfies never}`,
      );
  }
}

export default class Tile {
  #value: string;
  // [N, E, S, W]
  #sockets: NaryTuple<4, number>;
  #weight: number;
  constructor(value: string, weight: number, sockets: NaryTuple<4, number>) {
    this.#value = value;
    this.#weight = weight;
    this.#sockets = sockets;
  }
  get value(): string {
    return this.#value;
  }
  get weight(): number {
    return this.#weight;
  }
  socket(direction: Direction): number {
    return this.#sockets[direction_to_index(direction)];
  }
  fits(tile: Tile, direction: Direction): boolean {
    return this.#sockets[direction_to_index(direction)] ===
      tile.#sockets[direction_to_index(OPPOSITES.get(direction)!)];
  }
}
