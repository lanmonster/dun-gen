import mulberry32 from "./mulberry.ts";
import { expect } from "jsr:@std/expect";

Deno.test("subsequent calls to rng are not the same", () => {
    const rng = mulberry32();
    expect(rng()).not.toEqual(rng());
});

Deno.test("the same seed produces the same results", () => {
    const rng = mulberry32(5);
    const rng2 = mulberry32(5);
    const as = [rng(), rng(), rng()];
    const bs = [rng2(), rng2(), rng2()];
    expect(new Set(as).size).toEqual(as.length)
    expect(new Set(bs).size).toEqual(bs.length)
    expect(as).toEqual(bs);
});

Deno.test("different seed produces different results", () => {
    const rng = mulberry32(5);
    const rng2 = mulberry32(6);
    const as = [rng(), rng(), rng()];
    const bs = [rng2(), rng2(), rng2()];
    expect(new Set(as).size).toEqual(as.length)
    expect(new Set(bs).size).toEqual(bs.length)
    expect(as).not.toEqual(bs);
});
