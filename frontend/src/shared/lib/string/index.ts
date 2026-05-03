export type CapitalizeOptions = {
  /** Lowercase the rest of each word before capitalizing the first letter (default: true) */
  lowerRest?: boolean;
  /** Optional BCP 47 locale, e.g. "en-US", "tr", "de" (used for casing) */
  locale?: string | string[];
};

export type StringManagerType = {
  /** "HELLO" */
  toUpper(input: string, locale?: string | string[]): string;
  /** "hello" */
  toLower(input: string, locale?: string | string[]): string;

  /** "Hello world" (only the very first character) */
  capitalizeFirst(input: string, options?: Omit<CapitalizeOptions, "lowerRest">): string;

  /** "Hello World" (every word); set lowerRest=false to preserve existing capitals */
  capitalizeWords(input: string, options?: CapitalizeOptions): string;

  /** "Hello World" from any input form (camel/snake/kebab/spaces) */
  toStartCase(input: string, options?: CapitalizeOptions): string;

  /** "hello_world" */
  toSnakeCase(input: string): string;

  /** "HELLO_WORLD" */
  toConstantCase(input: string, locale?: string | string[]): string;

  /** "hello-world" */
  toKebabCase(input: string): string;

  /** "HelloWorld" */
  toPascalCase(input: string, locale?: string | string[]): string;

  /** "Hello_World" (capitalize all words then join by underscores) */
  toUnderscoreTitle(input: string, options?: CapitalizeOptions): string;

  /** Collapse internal whitespace to a single space and trim ends */
  collapseWhitespace(input: string): string;
};

export class StringManager implements StringManagerType {
  toUpper(input: string, locale?: string | string[]): string {
    return (input ?? "").toLocaleUpperCase(locale);
  }

  toLower(input: string, locale?: string | string[]) {
    return (input ?? "").toLocaleLowerCase(locale);
  }

  capitalizeFirst(input: string, options?: Omit<CapitalizeOptions, "lowerRest">) {
    const normalizedInput = input ?? "";
    if (!normalizedInput) return normalizedInput;

    const [firstCharacter, ...restCharacters] = normalizedInput;
    const upper = firstCharacter.toLocaleUpperCase(options?.locale);
    return upper + restCharacters.join("");
  }

  capitalizeWords(input: string, options?: CapitalizeOptions) {
    const { lowerRest = true, locale } = options ?? {};

    const words = this.#splitWords(input, {
      splitCamel: false,
      splitNum: false,
      respectSpaces: true,
    });

    const capitalizedWords = words.map((word) => {
      if (!word) return word;
      const head = word.charAt(0).toLocaleUpperCase(locale);
      const tail = lowerRest ? word.slice(1).toLocaleLowerCase(locale) : word.slice(1);
      return head + tail;
    });

    return capitalizedWords.join(" ");
  }

  toStartCase(input: string, options?: CapitalizeOptions) {
    const { lowerRest = true, locale } = options ?? {};
    const hasSpace = /\s/.test(input);

    const words = this.#splitWords(input, {
      splitCamel: !hasSpace,
      splitNum: true,
      respectSpaces: hasSpace,
    });

    return words
      .map((word) => {
        if (!word) return word;
        if (this.#isAcronym(word)) return word;
        const head = word.charAt(0).toLocaleUpperCase(locale);
        const tail = lowerRest ? word.slice(1).toLocaleLowerCase(locale) : word.slice(1);
        return head + tail;
      })
      .join(" ");
  }

  toSnakeCase(input: string) {
    const hasSpace = /\s/.test(input);

    return this.#splitWords(input, {
      splitCamel: true,
      splitNum: !hasSpace,
    })
      .map((word) => word.toLowerCase())
      .join("_");
  }

  toConstantCase(input: string, locale?: string | string[]) {
    return this.#splitWords(input, { splitCamel: true, splitNum: false })
      .map((word) => word.toLocaleUpperCase(locale))
      .join("_");
  }

  toKebabCase(input: string) {
    return this.#splitWords(input, { splitCamel: true, splitNum: false })
      .map((word) => word.toLowerCase())
      .join("-");
  }

  toPascalCase(input: string, locale?: string | string[]) {
    return this.#splitWords(input, { splitCamel: true, splitNum: false })
      .map((word) =>
        word ? word.charAt(0).toLocaleUpperCase(locale) + word.slice(1).toLowerCase() : word
      )
      .join("");
  }

  toUnderscoreTitle(input: string, options?: CapitalizeOptions) {
    const { lowerRest = true, locale } = options ?? {};
    const hasSpace = /\s/.test(input);

    const words = this.#splitWords(input, {
      splitCamel: !hasSpace,
      splitNum: false,
      respectSpaces: hasSpace,
    });

    return words
      .map((word) =>
        word
          ? word.charAt(0).toLocaleUpperCase(locale) +
            (lowerRest ? word.slice(1).toLocaleLowerCase() : word.slice(1))
          : word
      )
      .join("_");
  }

  collapseWhitespace(input: string) {
    return (input ?? "").replace(/\s+/g, " ").trim();
  }

  // ---------- helpers ----------
  #splitWords(
    input: string,
    options: { splitCamel?: boolean; splitNum?: boolean; respectSpaces?: boolean } = {}
  ): string[] {
    const { splitCamel = true, splitNum = true, respectSpaces = false } = options;
    if (!input) return [];

    const original = input;
    const chunks = respectSpaces ? original.split(/\s+/).filter(Boolean) : [original];

    const parts: string[] = [];
    for (const chunk of chunks) {
      let currentChunk = chunk;

      currentChunk = currentChunk.replace(/[^A-Za-z0-9]+/g, " ");

      if (splitCamel) {
        currentChunk = currentChunk.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
        currentChunk = currentChunk.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
      }

      if (splitNum) {
        currentChunk = currentChunk
          .replace(/([A-Za-z])(\d)/g, "$1 $2")
          .replace(/(\d)([A-Za-z])/g, "$1 $2");
      }

      for (const part of currentChunk.trim().split(/\s+/)) {
        if (part) parts.push(part);
      }
    }

    return parts;
  }

  #isAcronym(word: string): boolean {
    return /^[A-Z]{2,}$/.test(word);
  }
}

export const stringManager: StringManagerType = new StringManager();
