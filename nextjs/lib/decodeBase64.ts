/**
 * Decodes a base64 encoded string and parses it as JSON.
 *
 * @param str - The base64 encoded string to decode and parse.
 * @returns The parsed JSON object.
 * @throws Will throw an error if the base64 encoded string is not valid or cannot be parsed as JSON.
 *
 * @example
 * ```typescript
 * const encodedData = 'eyJ0eXAiOiAiU3RyaW5nIn0=';
 * const decodedData = decodeBase64(encodedData);
 * console.log(decodedData); // Output: { "key": "value" }
 * ```
 */
export default function decodeBase64(str: string): any {
    const data = atob(str);
    return JSON.parse(data);
}
