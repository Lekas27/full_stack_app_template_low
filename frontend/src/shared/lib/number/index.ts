export type NumberManagerType = {
  /**
   * Formats a number with locale-specific thousand separators.
   * Examples: 1000 → "1,000" | 1000.5 → "1,000.5"
   */
  formatWithLocale(value: number | null | undefined, locale?: string): string;

  /**
   * Formats a number as currency with proper decimal handling.
   * Shows decimals only if value has fractional part.
   * Examples: 1000.01 → "$1,000.01" | 10000 → "$10,000"
   */
  formatCurrency(value: number | null | undefined, locale?: string): string;

  /**
   * Formats a number as percentage with proper decimal handling.
   * Shows decimals only if value has fractional part.
   * Examples: 100.53 → "100.53%" | 10000 → "10,000%"
   */
  formatPercentage(value: number | null | undefined, locale?: string): string;

  /**
   * Formats a number with proper decimal handling.
   * Shows decimals only if value has fractional part.
   * Examples: 10000.35 → "10,000.35" | 100000 → "100,000"
   */
  formatNumber(value: number | null | undefined, locale?: string): string;
};

export class NumberManager implements NumberManagerType {
  formatWithLocale(value: number | null | undefined, locale: string = "en-US"): string {
    if (value === null || value === undefined) return "0";

    return Number(value).toLocaleString(locale);
  }

  formatCurrency(value: number | null | undefined, locale: string = "en-US"): string {
    if (value === null || value === undefined) return "$ 0";

    // Check if the number has decimal places
    const hasDecimals = value % 1 !== 0;

    const formatted = Number(value).toLocaleString(locale, {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    });

    return `$ ${formatted}`;
  }

  formatPercentage(value: number | null | undefined, locale: string = "en-US"): string {
    if (value === null || value === undefined) return "0 %";

    const hasDecimals = value % 1 !== 0;

    const formatted = Number(value).toLocaleString(locale, {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    });

    return `${formatted} %`;
  }

  formatNumber(value: number | null | undefined, locale: string = "en-US"): string {
    if (value === null || value === undefined) return "0";

    const hasDecimals = value % 1 !== 0;

    return Number(value).toLocaleString(locale, {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    });
  }
}

export const numberManager: NumberManagerType = new NumberManager();
