import print_sync from "./print.ts";

export default function print_grid<T>(grid: T[], side_length: number, str: (_: T) => string) {
    for (let r = 0; r < side_length; r++) {
        for (let c = 0; c < side_length; c++) {
            print_sync(str(grid[c + r * side_length]));
        }
        print_sync("\n");
    }
    print_sync("\n")
}

