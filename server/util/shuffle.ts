import { RNG } from "../types.ts";

export default function shuffle<T>(rng: RNG, array: T[]) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        const randomIndex = Math.floor(rng() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}
