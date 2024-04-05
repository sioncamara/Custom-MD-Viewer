import { cleanClipboardText } from "./stringUtils"
import { expect, test, describe } from "vitest"

describe("cleanClipboardText", () => {
  test("doesn't match if colon is after newline", () => {
    const input = `\`\`\`typescript
      interface InvoiceDrawerProps {
        reloadSearchOnCloseState: {
          value: boolean;
          setValue: (value: boolean) => void;
        };
        // other props...
      }
      \`\`\``

    const result = cleanClipboardText(input)

    const expectedOutput = input

    expect(result).toBe(expectedOutput)
  })

  test("removes folder paths after language specification", () => {
    const input = `\`\`\`typescript:app/utils/stringUtils.ts
      interface InvoiceDrawerProps {
        reloadSearchOnCloseState: {
          value: boolean;
          setValue: (value: boolean) => void;
        };
        // other props...
      }
      \`\`\``

    const result = cleanClipboardText(input)

    const expectedOutput = `\`\`\`typescript
      interface InvoiceDrawerProps {
        reloadSearchOnCloseState: {
          value: boolean;
          setValue: (value: boolean) => void;
        };
        // other props...
      }
      \`\`\``

    expect(result).toBe(expectedOutput)
  })
})
