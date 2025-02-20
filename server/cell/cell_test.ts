import { expect } from "jsr:@std/expect";
import Cell from "./cell.ts";
import random_in_range from "../util/random_in_range.ts";
import Tile from "../tile/tile.ts";
import { RNG } from "../types.ts";

// guaranteed random by fair dice roll
const rng: RNG = () => 4;
const testTile: () => Tile = () => new Tile("x", [0, 0, 0, 0]);

Deno.test("must have at least one option", () => {
  expect(() => new Cell(rng, [])).toThrow();
});

Deno.test("entropy means the number of options", () => {
  const number_of_options = random_in_range(Math.random, { min: 1, max: 10 });
  const options = Array.from({ length: number_of_options }, testTile);
  const cell = new Cell(rng, options);
  expect(cell.entropy).toEqual(options.length);
});

Deno.test("1 option means that cell is collapsed", () => {
  const options = Array.from({ length: 1 }, testTile);
  const cell = new Cell(rng, options);
  expect(cell.is_collapsed).toEqual(true);
});

Deno.test(">1 option means that cell is not collapsed", () => {
  const number_of_options = random_in_range(Math.random, { min: 2, max: 10 });
  const cell = new Cell(
    rng,
    Array.from({ length: number_of_options }, testTile),
  );
  expect(cell.is_collapsed).toEqual(false);
});

Deno.test("renders entropy", () => {
  const number_of_options = random_in_range(Math.random, { min: 2, max: 10 });
  const cell = new Cell(
    rng,
    Array.from({ length: number_of_options }, testTile),
  );
  expect(cell.render()).toEqual(String(number_of_options));
});

Deno.test("if there is only one option, render it's value", () => {
  const number_of_options = 1;
  const cell = new Cell(
    rng,
    Array.from({ length: number_of_options }, testTile),
  );
  expect(cell.render()).toEqual("x");
});

Deno.test("reduces options based on neighbor cell", () => {
  const cell = new Cell(
    rng,
    [new Tile(" ", [0, 0, 0, 0])],
  );
  const neighbor = new Cell(
    rng,
    [
      new Tile(" ", [0, 0, 0, 0]),
      new Tile("┃", [1, 0, 1, 0]),
      new Tile("━", [0, 1, 0, 1]),
      new Tile("┏", [0, 1, 1, 0]),
      new Tile("┓", [0, 0, 1, 1]),
      new Tile("┗", [1, 1, 0, 0]),
      new Tile("┛", [1, 0, 0, 1]),
      new Tile("▉", [1, 1, 1, 1]),
    ],
  );
  neighbor.constrain(cell, "NORTH");
  expect(neighbor.options()).toEqual([" ", "━", "┗", "┛"]);
});

