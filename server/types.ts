export type NaryTuple<N extends number, T, Ts extends T[] = []> =
    Ts["length"] extends N ? Ts : NaryTuple<N, T, [...Ts, T]>;

const DIRECTION = {
    NORTH: "North",
    EAST: "East",
    SOUTH: "South",
    WEST: "West",
} as const;

export type Direction = keyof typeof DIRECTION;

export type ZeroUpToN<N extends number, Acc extends number[] = []> =
    Acc["length"] extends N ? Acc[number] : ZeroUpToN<N, [...Acc, Acc["length"]]>;

export type InclusiveRange<A extends number, B extends number> =
    | Exclude<ZeroUpToN<B>, ZeroUpToN<A>>
    | B;

export type RNG = () => number;
