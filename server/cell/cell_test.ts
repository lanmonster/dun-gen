import { expect } from "jsr:@std/expect";
import Cell from "./cell.ts";
import random_in_range from "../util/random_in_range.ts";
import Tile from "../tile/tile.ts";
import { RNG } from "../types.ts";
import all_tiles from "../tile/all_tiles.ts";

// guaranteed random by fair dice roll
const rng: RNG = () => 4;
const testTile: () => Tile = () => new Tile("x", 1, [0, 0, 0, 0]);

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

Deno.test("if there is only one option, render its value", () => {
  const number_of_options = 1;
  const cell = new Cell(
    rng,
    Array.from({ length: number_of_options }, testTile),
  );
  expect(cell.render()).toEqual("x");
});

Deno.test("reduces options based on neighbor cell", () => {
  const cell = new Cell(rng, [all_tiles.ph]);
  const neighbor = new Cell(rng, [...Object.values(all_tiles)]);
  neighbor.constrain(cell, "NORTH");
  expect(neighbor.options()).toEqual([
    all_tiles.blank,
    all_tiles.cactus,
    all_tiles.cactus2,
    all_tiles.bush,
    all_tiles.ph,
    all_tiles.path_turn_ne,
    all_tiles.path_turn_wn,
    all_tiles.t_n,
    all_tiles.wall_bl,
    all_tiles.wall_b,
    all_tiles.wall_br,
  ].map((t) => t.value));
});

Deno.test("reduces options based on neighbor cell", () => {
  const cell = new Cell(rng, [all_tiles.x]);
  const neighbor = new Cell(rng, [...Object.values(all_tiles)]);
  neighbor.constrain(cell, "SOUTH");
  expect(neighbor.options()).toEqual([
    all_tiles.pv,
    all_tiles.path_turn_ne,
    all_tiles.path_turn_wn,
    all_tiles.x,
    all_tiles.t_n,
    all_tiles.t_e,
    all_tiles.t_w,
  ].map((t) => t.value));
});
