export default function random_in_range(
    rng: () => number,
    { min, max }: { min: number; max: number },
): number {
    return Math.floor(rng() * (max - min + 1)) + min;
}
