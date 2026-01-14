import type { NepaliDate } from "../NepaliDate";
import {
  MONTH_EN,
  MONTH_SHORT_EN,
  MONTH_NP,
  MONTH_SHORT_NP,
  NUMBER_NP,
  WEEK_EN,
  WEEK_SHORT_EN,
  WEEK_NP,
  WEEK_SHORT_NP,
} from "./Constants";

/**
 * Pads a number with a leading zero if it's less than 10.
 * @param n Number to pad
 * @returns String representation of the number, padded if necessary
 */
function pad(n: number): string {
  return n < 10 ? `0${String(n)}` : String(n);
}

/**
 * Converts a string of digits into Nepali digits.
 * Example: "123" → "१२३"
 * @param str String containing digits
 * @returns String with Nepali digits
 */
function npDigit(str: string): string {
  let res = "";
  for (let i = 0; i < str.length; i += 1) {
    res += NUMBER_NP[str.charCodeAt(i) - 48];
  }
  return res;
}

/**
 * Type for a date formatter function.
 * A formatter receives a NepaliDate and returns a formatted string.
 */
type DateFormatter = (date: NepaliDate) => string;

/**
 * Generates an English year formatter function based on the size.
 * @param size Number of characters requested (e.g., 2 → last two digits)
 * @returns DateFormatter function
 */
function yearEn(size: number): DateFormatter {
  return (date: NepaliDate): string => {
    if (size <= 2) {
      return String(date.getYear()).substring(2);
    }
    if (size === 3) {
      return String(date.getYear()).substring(1);
    }
    return String(date.getYear());
  };
}

/**
 * Generates a Nepali year formatter function based on the size.
 * @param size Number of characters requested (e.g., 2 → last two digits)
 * @returns DateFormatter function
 */
function yearNp(size: number): DateFormatter {
  return (date: NepaliDate): string => {
    if (size <= 2) {
      return npDigit(String(date.getYear()).substring(2));
    }
    if (size === 3) {
      return npDigit(String(date.getYear()).substring(1));
    }
    return npDigit(String(date.getYear()));
  };
}

/**
 * Generates an English month formatter function based on the size.
 * @param size Number of characters requested (e.g., 1 → single digit)
 * @returns DateFormatter function
 */
function monthEn(size: number): DateFormatter {
  return (date: NepaliDate): string => {
    if (size === 1) {
      return String(date.getMonth() + 1);
    }
    if (size === 2) {
      return pad(date.getMonth() + 1);
    }
    if (size === 3) {
      return MONTH_SHORT_EN[date.getMonth()];
    }
    return MONTH_EN[date.getMonth()];
  };
}

/**
 * Generates a Nepali month formatter function based on the size.
 * @param size Number of characters requested (e.g., 1 → single digit)
 * @returns DateFormatter function
 */
function monthNp(size: number): DateFormatter {
  return (date: NepaliDate): string => {
    if (size === 1) {
      return npDigit(String(date.getMonth() + 1));
    }
    if (size === 2) {
      return npDigit(pad(date.getMonth() + 1));
    }
    if (size === 3) {
      return MONTH_SHORT_NP[date.getMonth()];
    }
    return MONTH_NP[date.getMonth()];
  };
}

/**
 * Generates an English date formatter function based on the size.
 * @param size Number of characters requested (e.g., 1 → single digit)
 * @returns DateFormatter function
 */
function dateEn(size: number): DateFormatter {
  return (date: NepaliDate): string => {
    if (size === 1) {
      return String(date.getDate());
    }
    if (size === 2) {
      return pad(date.getDate());
    }
    if (size === 3) {
      return WEEK_SHORT_EN[date.getDay()];
    }
    return WEEK_EN[date.getDay()];
  };
}

/**
 * Generates a Nepali date formatter function based on the size.
 * @param size Number of characters requested (e.g., 1 → single digit)
 * @returns DateFormatter function
 */
function dateNp(size: number): DateFormatter {
  return (date: NepaliDate): string => {
    if (size === 1) {
      return npDigit(String(date.getDate()));
    }
    if (size === 2) {
      return npDigit(pad(date.getDate()));
    }
    if (size === 3) {
      return WEEK_SHORT_NP[date.getDay()];
    }
    return WEEK_NP[date.getDay()];
  };
}

/**
 * Creates a formatter that returns a fixed string.
 * @param seq String to return
 * @returns DateFormatter function
 */
function pass(seq: string): DateFormatter {
  return (): string => seq;
}

/**
 * Mapping of format characters to their corresponding formatter functions.
 * @type Record<string, (size: number) => DateFormatter>
 */
const fn: Record<string, (size: number) => DateFormatter> = {
  Y: yearEn,
  y: yearNp,
  M: monthEn,
  m: monthNp,
  D: dateEn,
  d: dateNp,
};

/**
 * Checks if a character is a special format character.
 * @param ch Character to check
 * @returns True if the character is a special format character, false otherwise
 */
function isSpecial(ch: string): boolean {
  return ch in fn;
}

/**
 * Tokenizes a format string into an array of formatters.
 * @param formatStr Format string to tokenize
 * @returns Array of DateFormatter functions
 */
function tokenize(formatStr: string): DateFormatter[] {
  let inQuote = false;
  let seq = "";
  let special = "";
  let specialSize = 0;

  const tokens: DateFormatter[] = [];

  for (const ch of formatStr) {
    if (ch === special) {
      specialSize += 1;
      continue;
    }

    if (special !== "") {
      tokens.push(fn[special](specialSize));
      special = "";
      specialSize = 0;
    }

    if (ch === '"') {
      inQuote = !inQuote;
      continue;
    }

    if (!isSpecial(ch) || inQuote) {
      seq += ch;
    } else {
      if (seq) {
        tokens.push(pass(seq));
        seq = "";
      }

      special = ch;
      specialSize = 1;
    }
  }

  if (seq) {
    tokens.push(pass(seq));
  } else if (special) {
    tokens.push(fn[special](specialSize));
  }

  return tokens;
}

/**
 * Formats a NepaliDate using the specified format string.
 * @param nepaliDate Date to format
 * @param formatStr Format string
 * @returns Formatted string
 */
export default function format(nepaliDate: NepaliDate, formatStr: string): string {
  return tokenize(formatStr)
    .map((f) => f(nepaliDate))
    .join("");
}
