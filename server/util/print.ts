export default function print_sync(input: string | Uint8Array, to = Deno.stdout) {
    let bytesWritten = 0;
    const bytes = typeof input === "string"
        ? new TextEncoder().encode(input)
        : input;
    while (bytesWritten < bytes.length) {
        bytesWritten += to.writeSync(bytes.subarray(bytesWritten));
    }
}

