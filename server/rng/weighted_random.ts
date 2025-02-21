import { RNG } from "../types.ts";

export default function weighted_random(rng: RNG, weights: number[]): number {
  let sum = 0;
  const cumulative_sum = weights.map((w) => {
    sum += w;
    return sum;
  });
  const random = rng() * sum;
  for (let i = 0; i < weights.length; i++) {
    if (cumulative_sum[i] >= random) {
      return i;
    }
  }
  return random;
}
