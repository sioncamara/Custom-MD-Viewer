// remove's folder paths after a language specification (e.g, ```typescript:app/component.tsx... to ```typscript...)
/**
 * Removes folder paths after a language specification in a code block.
 *
 * @param clipboardText The input string containing the code block.
 * @returns The modified string with folder paths removed after the language specification.
 *
 * @example
 * const input = '```typescript:app/component.tsx...```';
 * const output = cleanClipboardText(input);
 * console.log(output); '```typscript...```'
 */
export function cleanClipboardText(clipboardText: string) {
  const regex = /(?<language>`{3}[\S]*?):[^\n`]*?(?=\n)/

  return clipboardText.replace(regex, "$<language>")
}
