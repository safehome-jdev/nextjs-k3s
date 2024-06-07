/**
 * Encodes a JavaScript object to a base64 string.
 *
 * @remarks
 * This function takes a JavaScript object as input, converts it to a JSON string,
 * and then encodes the JSON string to a base64 string using the `btoa` function.
 *
 * @param obj - The JavaScript object to be encoded.
 * @returns The base64 encoded string.
 *
 * @throws Will throw an error if the input object cannot be stringified.
 *
 * @example
 * ```typescript
 * const obj = { name: 'John', age: 30 };
 * const encoded = encodeToBase64(obj);
 * console.log(encoded); // Output: "eyJuYW1lIjogIkpvaG4gMzAsfQ=="
 * ```
 */
export default function encodeToBase64(obj: any): string {
    const data = JSON.stringify(obj);
    return btoa(data);
}
