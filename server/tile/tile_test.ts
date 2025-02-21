import { expect } from "jsr:@std/expect";
import Tile from "./tile.ts";

Deno.test("gives the value", () => {
    const tile = new Tile("x", 1,[0, 0, 0, 0]);
    expect(tile.value).toEqual("x");
});

Deno.test("sockets fit if they are the same in the opposite direction N", () => {
    const t1 = new Tile("a", 1,[1,0,0,0])
    const t2 = new Tile("a", 1,[0,0,1,0])
    expect(t1.fits(t2, 'NORTH')).toEqual(true)
})

Deno.test("sockets do not fit if they are not the same in the opposite direction N", () => {
    const t1 = new Tile("a", 1,[1,0,0,0])
    const t2 = new Tile("a", 1,[0,0,2,0])
    expect(t1.fits(t2, 'NORTH')).toEqual(false)
})

Deno.test("sockets fit if they are the same in the opposite direction S", () => {
    const t1 = new Tile("a", 1,[0,0,1,0])
    const t2 = new Tile("a", 1,[1,0,0,0])
    expect(t1.fits(t2, 'SOUTH')).toEqual(true)
})

Deno.test("sockets do not fit if they are not the same in the opposite direction S", () => {
    const t1 = new Tile("a", 1,[0,0,1,0])
    const t2 = new Tile("a", 1,[2,0,0,0])
    expect(t1.fits(t2, 'SOUTH')).toEqual(false)
})

Deno.test("sockets fit if they are the same in the opposite direction E", () => {
    const t1 = new Tile("a", 1,[0,1,0,0])
    const t2 = new Tile("a", 1,[0,0,0,1])
    expect(t1.fits(t2, 'EAST')).toEqual(true)
})

Deno.test("sockets do not fit if they are not the same in the opposite direction E", () => {
    const t1 = new Tile("a", 1,[0,1,0,0])
    const t2 = new Tile("a", 1,[0,0,0,2])
    expect(t1.fits(t2, 'EAST')).toEqual(false)
})

Deno.test("sockets fit if they are the same in the opposite direction W", () => {
    const t1 = new Tile("a", 1,[0,0,0,1])
    const t2 = new Tile("a", 1,[0,1,0,0])
    expect(t1.fits(t2, 'WEST')).toEqual(true)
})

Deno.test("sockets do not fit if they are not the same in the opposite direction W", () => {
    const t1 = new Tile("a", 1,[0,0,0,1])
    const t2 = new Tile("a", 1,[0,2,0,0])
    expect(t1.fits(t2, 'WEST')).toEqual(false)
})

