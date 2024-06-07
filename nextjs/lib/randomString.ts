/**
 * Generates a random string of specified length.
 *
 * @param length - The length of the random string to generate. Default is 16.
 * @returns A random string of the specified length.
 *
 * @example
 * ```typescript
 * const randomStr = randomString(10);
 * console.log(randomStr); // Output: "aBcDeFgHiJ"
 * ```
 */
export function randomString(length: number = 16): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        // Runs `length` times, with values of `i` from 0 through `length - 1`.
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}
