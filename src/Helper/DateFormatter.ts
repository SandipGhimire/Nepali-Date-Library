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

function pad(n: number): string {
  return n < 10 ? `0${String(n)}` : String(n);
}

function npDigit(str: string): string {
  let res = "";
  for (let i = 0; i < str.length; i += 1) {
    res += NUMBER_NP[str.charCodeAt(i) - 48];
  }
  return res;
}

type DateFormatter = (date: NepaliDate) => string;

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

function pass(seq: string): DateFormatter {
  return (): string => seq;
}

const fn: Record<string, (size: number) => DateFormatter> = {
  Y: yearEn,
  y: yearNp,
  M: monthEn,
  m: monthNp,
  D: dateEn,
  d: dateNp,
};

function isSpecial(ch: string): boolean {
  return ch in fn;
}

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

export default function format(nepaliDate: NepaliDate, formatStr: string): string {
  return tokenize(formatStr)
    .map((f) => f(nepaliDate))
    .join("");
}
