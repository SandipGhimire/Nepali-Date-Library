import {
  EPOCH,
  MONTH_EN,
  MONTH_NP,
  MONTH_SHORT_EN,
  MONTH_SHORT_NP,
  NEPALI_DATE_MAP,
  WEEK_EN,
  WEEK_NP,
  WEEK_SHORT_EN,
  WEEK_SHORT_NP,
} from "./Helper/Constants";
import format from "./Helper/DateFormatter";

/**
 * Parses a date string into Nepali date components
 * @param dateString Date string in format YYYY-MM-DD, YYYY/MM/DD, or YYYY.MM.DD
 * @returns Tuple containing [year, month, day] where month is 0-indexed
 * @throws Error if the date format is invalid or date is out of range
 * @private
 */
function _parse(dateString: string): [number, number, number] {
  const parts = dateString.split(/[-./]/, 3);

  const [year, month = 1, day = 1] = parts.map((d) => {
    const n = parseInt(d, 10);
    if (Number.isNaN(n)) {
      throw new Error("Invalid date");
    }
    return n;
  });

  if (year < NEPALI_DATE_MAP[0].year || year >= NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length) {
    throw new Error("Nepal year out of range");
  }

  if (month < 1 || month > 12) {
    throw new Error("Invalid nepali month must be between 1 - 12");
  }

  const daysInMonth = NEPALI_DATE_MAP[year - NEPALI_DATE_MAP[0].year].days[month - 1];
  if (day < 1 || day > daysInMonth) {
    throw new Error(
      `Invalid nepali date must be between 1 - ${String(daysInMonth)} in ${String(year)} ${String(month)}`
    );
  }

  return [year, month - 1, day];
}

/**
 * Class representing a Nepali date (Bikram Sambat)
 * Provides methods to create, manipulate and format Nepali dates
 */
export class NepaliDate {
  /** JavaScript Date object representing the equivalent Gregorian date */
  public timestamp!: Date;

  /** Nepali year (BS) */
  public year!: number;

  /** Nepali month (0-11) */
  public month!: number;

  /** Nepali day of month (1-32) */
  public day!: number;

  /**
   * Creates a NepaliDate instance
   * @param year Nepali year (optional)
   * @param month Nepali month (0-11, optional)
   * @param day Nepali day (1-32, optional)
   * @param date Source date as Date, NepaliDate, timestamp, or string (optional)
   */
  constructor(yearOrDate?: Date | NepaliDate | number | string, month?: number, day?: number) {
    if (yearOrDate == undefined) {
      this.setEnglishDate(new Date());
    } else if (typeof yearOrDate === "object") {
      if (yearOrDate instanceof Date) {
        this.setEnglishDate(yearOrDate);
      } else if (yearOrDate instanceof NepaliDate) {
        this.timestamp = yearOrDate.timestamp;
        this.year = yearOrDate.year;
        this.month = yearOrDate.month;
        this.day = yearOrDate.day;
      } else {
        throw new Error("Invalid argument syntax");
      }
    } else if (typeof yearOrDate === "string") {
      this.set(..._parse(yearOrDate));
    } else if (typeof yearOrDate === "number" && month !== undefined && day !== undefined) {
      this.set(yearOrDate, month, day);
    } else if (typeof yearOrDate === "number") {
      this.setEnglishDate(new Date(yearOrDate));
    } else {
      throw new Error("Invalid argument syntax");
    }
  }

  /**
   * Sets the internal properties based on the provided English (Gregorian) date
   * @param date JavaScript Date object
   * @private
   */
  private setEnglishDate(date: Date): void {
    this.timestamp = date;

    const utcTime = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

    let daysCount = Math.floor((utcTime - EPOCH) / 86400000);
    let idx = Math.floor(daysCount / 366);

    while (daysCount >= NEPALI_DATE_MAP[idx].daysTillNow) {
      idx += 1;
    }

    const prevTillNow = NEPALI_DATE_MAP[idx - 1]?.daysTillNow ?? 0;

    daysCount -= prevTillNow;
    const tmp = NEPALI_DATE_MAP[idx];

    this.year = tmp.year;
    this.month = 0;

    while (daysCount >= tmp.days[this.month]) {
      this.month += 1;
      daysCount -= tmp.days[this.month - 1];
    }

    this.day = daysCount + 1;
  }

  /**
   * Returns the equivalent English (Gregorian) date
   * @returns JavaScript Date object representing the equivalent Gregorian date
   */
  public getEnglishDate(): Date {
    return this.timestamp;
  }

  /**
   * Parses a date string and updates the current instance
   * @param dateString Date string in format YYYY-MM-DD, YYYY/MM/DD, or YYYY.MM.DD
   * @throws Error if the date format is invalid or date is out of range
   */
  public parse(dateString: string): void {
    this.set(..._parse(dateString));
  }

  /**
   * Returns the Nepali year
   * @returns Nepali year
   */
  public getYear(): number {
    return this.year;
  }

  /**
   * Returns the Nepali month (0-11)
   * @returns Nepali month (0-11)
   */
  public getMonth(): number {
    return this.month;
  }

  /**
   * Returns the Nepali day of month
   * @returns Nepali day of month (1-32)
   */
  public getDate(): number {
    return this.day;
  }

  /**
   * Returns the day of week (0-6, 0 = Sunday)
   * @returns Day of week (0-6, 0 = Sunday)
   */
  public getDay(): number {
    return this.timestamp.getDay();
  }

  /**
   * Returns the hour (0-23)
   * @returns Hour (0-23)
   */
  public getHours(): number {
    return this.timestamp.getHours();
  }

  /**
   * Returns the minutes (0-59)
   * @returns Minutes (0-59)
   */
  public getMinutes(): number {
    return this.timestamp.getMinutes();
  }

  /**
   * Returns the seconds (0-59)
   * @returns Seconds (0-59)
   */
  public getSeconds(): number {
    return this.timestamp.getSeconds();
  }

  /**
   * Returns the milliseconds (0-999)
   * @returns Milliseconds (0-999)
   */
  public getMilliseconds(): number {
    return this.timestamp.getMilliseconds();
  }

  /**
   * Returns the timestamp (milliseconds since Unix Epoch)
   * @returns Timestamp in milliseconds
   */
  public getTime(): number {
    return this.timestamp.getTime();
  }

  /**
   * Sets the Nepali year
   * @param year Nepali year
   */
  public setYear(year: number): void {
    this.set(year, this.month, this.day);
  }

  /**
   * Sets the Nepali month
   * @param month Nepali month (0-11)
   */
  public setMonth(month: number): void {
    this.set(this.year, month, this.day);
  }

  /**
   * Sets the Nepali day of month
   * @param day Nepali day of month (1-32)
   */
  public setDate(day: number): void {
    this.set(this.year, this.month, day);
  }

  /**
   * Sets the Nepali date components and updates the internal timestamp
   * @param year Nepali year
   * @param month Nepali month (0-11)
   * @param date Nepali day (1-32)
   */
  public set(year: number, month: number, date: number): void {
    const idx = year + Math.floor(month / 12) - NEPALI_DATE_MAP[0].year;
    if (idx < 0 || idx >= NEPALI_DATE_MAP.length) {
      throw new Error("Nepal year out of range!");
    }
    const tmp = NEPALI_DATE_MAP[idx];
    let d = tmp.daysTillNow - tmp.totalDays;

    const m = month % 12;
    const mm = m < 0 ? 12 + m : m;

    for (let i = 0; i < mm; i += 1) {
      d += tmp.days[i];
    }
    d += date - 1;
    const utcTimestamp = EPOCH + d * 86400000;
    const utcDate = new Date(utcTimestamp);

    this.setEnglishDate(utcDate);
  }

  /**
   * Formats the Nepali date according to the specified format string
   * @param formatStr Format string (see DateFormatter for syntax)
   * @returns Formatted date string
   */
  public format(formatStr: string): string {
    return format(this, formatStr);
  }

  /**
   * Returns the string representation of the Nepali date
   * @returns Date string in format YYYY/MM/DD where MM is 1-indexed
   */
  public toString(): string {
    return `${String(this.year)}/${String(this.month + 1)}/${String(this.day)}`;
  }

  /**
   * Adds the specified number of days to the current Nepali date
   * @param days Number of days to add (can be negative)
   * @returns A new NepaliDate instance with the added days
   */
  public addDays(days: number): NepaliDate {
    const newTimestamp = new Date(this.timestamp.getTime() + days * 86400000);
    return new NepaliDate(newTimestamp);
  }

  /**
   * Adds the specified number of months to the current Nepali date
   * @param months Number of months to add (can be negative)
   * @returns A new NepaliDate instance with the added months
   */
  public addMonths(months: number): NepaliDate {
    let newYear = this.year;
    let newMonth = this.month + months;

    newYear += Math.floor(newMonth / 12);
    newMonth = newMonth % 12;

    if (newMonth < 0) {
      newMonth += 12;
      newYear -= 1;
    }

    const yearIndex = newYear - NEPALI_DATE_MAP[0].year;
    if (yearIndex < 0 || yearIndex >= NEPALI_DATE_MAP.length) {
      throw new Error("Resulting date is out of supported range");
    }

    const daysInNewMonth = NEPALI_DATE_MAP[yearIndex].days[newMonth];

    const newDay = Math.min(this.day, daysInNewMonth);

    return new NepaliDate(newYear, newMonth, newDay);
  }

  /**
   * Adds the specified number of years to the current Nepali date
   * @param years Number of years to add (can be negative)
   * @returns A new NepaliDate instance with the added years
   */
  public addYears(years: number): NepaliDate {
    const newYear = this.year + years;

    if (newYear < NEPALI_DATE_MAP[0].year || newYear >= NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length) {
      throw new Error("Resulting date is out of supported range");
    }

    const yearIndex = newYear - NEPALI_DATE_MAP[0].year;

    if (this.month === 11 && this.day === 29) {
      const daysInFalgun = NEPALI_DATE_MAP[yearIndex].days[11];
      if (daysInFalgun < 29) {
        return new NepaliDate(newYear, 11, daysInFalgun);
      }
    }

    return new NepaliDate(newYear, this.month, this.day);
  }

  /**
   * Returns the earliest date supported by the NepaliDate class
   * @returns JavaScript Date object representing the minimum supported date
   */
  public static minimum(): Date {
    return new Date(EPOCH);
  }

  /**
   * Returns the latest date supported by the NepaliDate class
   * @returns JavaScript Date object representing the maximum supported date
   */
  public static maximum(): Date {
    return new Date(EPOCH + NEPALI_DATE_MAP[NEPALI_DATE_MAP.length - 1].daysTillNow * 86400000);
  }

  /**
   * Returns the number of days in the current month
   * @returns Number of days in the month
   */
  public daysInMonth(): number {
    const yearIndex = this.year - NEPALI_DATE_MAP[0].year;
    return NEPALI_DATE_MAP[yearIndex].days[this.month];
  }

  /**
   * Checks if the current year is a leap year in the Nepali calendar
   * @returns true if the year is a leap year, false otherwise
   */
  public isLeapYear(): boolean {
    const yearIndex = this.year - NEPALI_DATE_MAP[0].year;
    return NEPALI_DATE_MAP[yearIndex].totalDays === 366;
  }

  /**
   * Calculates the number of weeks in the current month
   * @returns Number of weeks in the month
   */
  public getWeeksInMonth(): number {
    const firstDay = new NepaliDate(this.year, this.month, 1);
    const firstDayOfWeek = firstDay.getDay();
    const totalDays = this.daysInMonth();
    return Math.ceil((firstDayOfWeek + totalDays) / 7);
  }

  /**
   * Calculates the difference between two dates in the specified unit
   * @param date NepaliDate to compare with
   * @param unit Unit for the difference calculation ('year', 'month', or 'day')
   * @returns Difference value in the specified unit
   */
  public diff(date: NepaliDate, unit: "year" | "month" | "day"): number {
    switch (unit) {
      case "day":
        return Math.floor((this.timestamp.getTime() - date.timestamp.getTime()) / 86400000);

      case "month": {
        const yearDiff = this.year - date.year;
        const monthDiff = this.month - date.month;
        return yearDiff * 12 + monthDiff;
      }

      case "year":
        return this.year - date.year;

      default:
        throw new Error("Invalid unit for diff calculation");
    }
  }

  /**
   * Returns a new NepaliDate representing the start of the current day (00:00:00)
   * @returns A new NepaliDate set to the start of the day
   */
  public startOfDay(): NepaliDate {
    const date = new Date(this.timestamp);
    date.setHours(0, 0, 0, 0);
    return new NepaliDate(date);
  }

  /**
   * Returns a new NepaliDate representing the end of the current day (23:59:59.999)
   * @returns A new NepaliDate set to the end of the day
   */
  public endOfDay(): NepaliDate {
    const date = new Date(this.timestamp);
    date.setHours(23, 59, 59, 999);
    return new NepaliDate(date);
  }

  /**
   * Returns a new NepaliDate representing the start of the week containing this date
   * By default, weeks start on Sunday (day 0)
   * @param startOfWeek Day to consider as start of week (0-6, where 0 = Sunday, 1 = Monday, etc.)
   * @returns A new NepaliDate set to the first day of the week
   */
  startOfWeek(startOfWeek = 0): NepaliDate {
    // Validate startOfWeek parameter
    if (startOfWeek < 0 || startOfWeek > 6 || !Number.isInteger(startOfWeek)) {
      throw new Error("startOfWeek must be an integer between 0 and 6");
    }

    // Get current day of week
    const currentDay = this.getDay();

    // Calculate days to subtract to reach start of week
    // We add 7 before taking modulo to handle negative results
    const daysToSubtract = (currentDay - startOfWeek + 7) % 7;

    // Create a new date at the start of the current day
    const result = this.clone().startOfDay();

    // Subtract the required number of days
    return result.addDays(-daysToSubtract);
  }

  /**
   * Returns a new NepaliDate representing the end of the week containing this date
   * By default, weeks end on Saturday (day 6)
   * @param startOfWeek Day to consider as start of week (0-6, where 0 = Sunday, 1 = Monday, etc.)
   * @returns A new NepaliDate set to the last day of the week
   */
  endOfWeek(startOfWeek = 0): NepaliDate {
    // Get the start of the week
    const weekStart = this.startOfWeek(startOfWeek);

    // End of week is 6 days after start of week
    const result = weekStart.addDays(6);

    // Set time to end of day
    return result.endOfDay();
  }

  /**
   * Returns a new NepaliDate representing the start of the current month (1st day)
   * @returns A new NepaliDate set to the first day of the month
   */
  public startOfMonth(): NepaliDate {
    return new NepaliDate(this.year, this.month, 1);
  }

  /**
   * Returns a new NepaliDate representing the end of the current month (last day)
   * @returns A new NepaliDate set to the last day of the month
   */
  public endOfMonth(): NepaliDate {
    const daysInMonth = this.daysInMonth();
    return new NepaliDate(this.year, this.month, daysInMonth).endOfDay();
  }

  /**
   * Returns a new NepaliDate representing the start of the current year (1st Baisakh)
   * @returns A new NepaliDate set to the first day of the year
   */
  public startOfYear(): NepaliDate {
    return new NepaliDate(this.year, 0, 1);
  }

  /**
   * Returns a new NepaliDate representing the end of the current year (last day of Chaitra)
   * @returns A new NepaliDate set to the last day of the year
   */
  public endOfYear(): NepaliDate {
    const yearIndex = this.year - NEPALI_DATE_MAP[0].year;
    const daysInChaitra = NEPALI_DATE_MAP[yearIndex].days[11];
    return new NepaliDate(this.year, 11, daysInChaitra).endOfDay();
  }

  /**
   * Returns the name of the specified Nepali month
   * @param month Month index (0-11)
   * @param short Whether to return the short form of the month name
   * @returns Month name in Nepali or English
   */
  public static getMonthName(month: number, short = false, nepali = false): string {
    if (month < 0 || month > 11) {
      throw new Error("Invalid month index, must be between 0-11");
    }
    let result = "";
    if (nepali) {
      result = short ? MONTH_SHORT_NP[month] : MONTH_NP[month];
    } else {
      result = short ? MONTH_SHORT_EN[month] : MONTH_EN[month];
    }

    return result;
  }

  /**
   * Returns the name of the specified day of week
   * @param day Day of week (0-6, where 0 is Sunday)
   * @param short Whether to return the short form of the day name
   * @returns Day name in Nepali or English
   */
  public static getDayName(day: number, short = false, nepali = false): string {
    if (day < 0 || day > 6) {
      throw new Error("Invalid day index, must be between 0-6");
    }

    let result = "";
    if (nepali) {
      result = short ? WEEK_SHORT_NP[day] : WEEK_NP[day];
    } else {
      result = short ? WEEK_SHORT_EN[day] : WEEK_EN[day];
    }

    return result;
  }

  /**
   * Checks if the specified Nepali date is valid
   * @param year Nepali year to validate
   * @param month Nepali month to validate (0-11)
   * @param day Nepali day to validate
   * @returns true if the date is valid, false otherwise
   */
  public static isValid(year: number, month: number, day: number): boolean {
    try {
      if (year < NEPALI_DATE_MAP[0].year || year >= NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length) {
        return false;
      }

      if (month < 0 || month > 11) {
        return false;
      }

      const yearIndex = year - NEPALI_DATE_MAP[0].year;
      const daysInMonth = NEPALI_DATE_MAP[yearIndex].days[month];

      if (day < 1 || day > daysInMonth) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if the current NepaliDate instance contains a valid date
   * @returns true if the date is valid, false otherwise
   */
  public isValid(): boolean {
    return NepaliDate.isValid(this.year, this.month, this.day);
  }

  /**
   * Generate calendar days for a given month, including trailing/leading days from adjacent months
   * @param year Nepali year
   * @param month Nepali month (0-11)
   * @returns An object containing the calendar days for the previous month, current month, and next month.
   * The object also includes the remaining days and the day objects for each month,
   * with each day object containing the date and a flag indicating whether it is part of the current month.
   */
  public static getCalendarDays(
    year: number,
    month: number
  ): {
    prevRemainingDays: number;
    prevMonth: { year: number; month: number; days: number[] };
    currentMonth: { year: number; month: number; days: number[] };
    nextMonth: { year: number; month: number; days: number[] };
    remainingDays: number;
  } {
    if (!NepaliDate.isValid(year, month, 1)) {
      throw new Error("Invalid year or month");
    }

    const prevMonthMap: { year: number; month: number; days: number[] } = {
      year: 0,
      month: 0,
      days: [],
    };
    const currentMonthMap: { year: number; month: number; days: number[] } = {
      year: 0,
      month: 0,
      days: [],
    };
    const nextMonthMap: { year: number; month: number; days: number[] } = {
      year: 0,
      month: 0,
      days: [],
    };

    const yearIndex = year - NEPALI_DATE_MAP[0].year;

    const firstDay = new NepaliDate(year, month, 1);
    const firstDayOfWeek = firstDay.getDay();

    const daysInMonth = NEPALI_DATE_MAP[yearIndex].days[month];

    currentMonthMap.year = year;
    currentMonthMap.month = month;

    let prevMonth = month - 1;
    let prevYear = year;

    let nextMonth = month + 1;
    let nextYear = year;

    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }

    if (prevYear >= NEPALI_DATE_MAP[0].year) {
      prevMonthMap.year = prevYear;
      prevMonthMap.month = prevMonth;
    }

    if (prevYear >= NEPALI_DATE_MAP[0].year && firstDayOfWeek > 0) {
      const prevMonthIndex = prevYear - NEPALI_DATE_MAP[0].year;
      const daysInPrevMonth = NEPALI_DATE_MAP[prevMonthIndex].days[prevMonth];

      for (let i = 0; i < firstDayOfWeek; i++) {
        prevMonthMap.days.push(daysInPrevMonth - firstDayOfWeek + i + 1);
      }
    }

    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthMap.days.push(i);
    }

    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear++;
    }

    if (nextYear < NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length) {
      nextMonthMap.year = nextYear;
      nextMonthMap.month = nextMonth;
    }

    const remainingDays = 42 - firstDayOfWeek - currentMonthMap.days.length;

    if (nextYear < NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length && remainingDays > 0) {
      for (let i = 1; i <= remainingDays; i++) {
        nextMonthMap.days.push(i);
      }
    }

    return {
      prevRemainingDays: firstDayOfWeek,
      prevMonth: prevMonthMap,
      currentMonth: currentMonthMap,
      nextMonth: nextMonthMap,
      remainingDays: remainingDays,
    };
  }

  /**
   * Creates a copy of the current NepaliDate instance
   * @returns A new NepaliDate instance with the same date and time
   */
  public clone(): NepaliDate {
    return new NepaliDate(this);
  }

  /**
   * Checks if this date comes after the specified date
   * @param date Date to compare with
   * @returns true if this date is after the specified date, false otherwise
   */
  public isAfter(date: NepaliDate): boolean {
    return this.timestamp.getTime() > date.timestamp.getTime();
  }

  /**
   * Checks if this date comes before the specified date
   * @param date Date to compare with
   * @returns true if this date is before the specified date, false otherwise
   */
  public isBefore(date: NepaliDate): boolean {
    return this.timestamp.getTime() < date.timestamp.getTime();
  }

  /**
   * Checks if this date is equal to the specified date
   * @param date Date to compare with
   * @returns true if dates are exactly equal (year, month, day), false otherwise
   */
  public isEqual(date: NepaliDate): boolean {
    return this.year === date.year && this.month === date.month && this.day === date.day;
  }

  /**
   * Checks if this date is the same as the specified date for the given unit
   * @param date Date to compare with
   * @param unit Unit to use for comparison ('year', 'month', or 'day')
   * @returns true if dates are the same for the specified unit, false otherwise
   */
  public isSame(date: NepaliDate, unit: "year" | "month" | "day"): boolean {
    switch (unit) {
      case "year":
        return this.year === date.year;

      case "month":
        return this.year === date.year && this.month === date.month;

      case "day":
        return this.isEqual(date);

      default:
        throw new Error("Invalid unit for comparison");
    }
  }

  /**
   * Returns the start and end dates for a specific quarter in the specified year
   * @param quarter Quarter number (1-4)
   * @param year Nepali year (defaults to current year if not specified)
   * @returns Object containing start and end dates for the specified quarter
   * @throws Error if quarter is not between 1 and 4
   */
  static getQuarter(quarter: number, year?: number): { start: NepaliDate; end: NepaliDate } {
    if (quarter < 1 || quarter > 4 || !Number.isInteger(quarter)) {
      throw new Error("Quarter must be an integer between 1 and 4");
    }

    const nepaliYear = year ?? new NepaliDate().getYear();
    const startMonth = (quarter - 1) * 3;

    const start = new NepaliDate(nepaliYear, startMonth, 1);
    const end = new NepaliDate(nepaliYear, startMonth + 2, 1).endOfMonth();

    return { start, end };
  }

  /**
   * Returns the quarter number (1-4) for the current date
   * @returns Quarter number (1-4)
   */
  getCurrentQuarter(): number {
    return Math.floor(this.month / 3) + 1;
  }

  /**
   * Returns all quarters for a specified fiscal year
   * @param year Fiscal year (defaults to current fiscal year if not specified)
   * @returns Object containing start and end dates for each quarter of the fiscal year
   */
  static getQuarters(year?: number): {
    Q1: { start: NepaliDate; end: NepaliDate };
    Q2: { start: NepaliDate; end: NepaliDate };
    Q3: { start: NepaliDate; end: NepaliDate };
    Q4: { start: NepaliDate; end: NepaliDate };
  } {
    const nepaliYear = year ?? new NepaliDate().getYear();

    return {
      Q1: NepaliDate.getQuarter(1, nepaliYear),
      Q2: NepaliDate.getQuarter(2, nepaliYear),
      Q3: NepaliDate.getQuarter(3, nepaliYear),
      Q4: NepaliDate.getQuarter(4, nepaliYear),
    };
  }

  /**
   * Returns the current fiscal year based on the current date
   * Nepali fiscal year starts from Shrawan 1st (month 3, day 1)
   * @returns Current fiscal year
   */
  static getCurrentFiscalYear(): number {
    const today = new NepaliDate();
    const year = today.getYear();
    const month = today.getMonth();

    return month < 3 ? year - 1 : year;
  }

  /**
   * Returns the start and end dates for a specific fiscal year quarter
   * @param quarter Fiscal year quarter number (1-4)
   * @param fiscalYear Fiscal year (defaults to current fiscal year if not specified)
   * @returns Object containing start and end dates for the specified fiscal year quarter
   * @throws Error if quarter is not between 1 and 4
   */
  static getFiscalYearQuarter(quarter: number, fiscalYear?: number): { start: NepaliDate; end: NepaliDate } {
    if (quarter < 1 || quarter > 4 || !Number.isInteger(quarter)) {
      throw new Error("Quarter must be an integer between 1 and 4");
    }

    const currentFiscalYear = fiscalYear ?? NepaliDate.getCurrentFiscalYear();

    let startYear = currentFiscalYear;
    let startMonth = (quarter - 1) * 3 + 3;

    if (quarter === 4) {
      startYear = currentFiscalYear + 1;
      startMonth = 0;
    }

    if (startMonth > 11) {
      startYear++;
      startMonth -= 12;
    }

    let endMonth = startMonth + 2;
    let endYear = startYear;

    if (endMonth > 11) {
      endYear++;
      endMonth -= 12;
    }

    const start = new NepaliDate(startYear, startMonth, 1);
    const end = new NepaliDate(endYear, endMonth, 1).endOfMonth();

    return { start, end };
  }

  /**
   * Returns the current fiscal year quarter number (1-4) for the current date
   * @returns Current fiscal year quarter number (1-4)
   */
  getCurrentFiscalYearQuarter(): number {
    const month = this.getMonth();

    if (month >= 3 && month <= 5) return 1;
    if (month >= 6 && month <= 8) return 2;
    if (month >= 9 && month <= 11) return 3;

    return 4;
  }

  /**
   * Returns the start and end dates of the current fiscal year quarter
   * @returns Object containing start and end dates of the current fiscal year quarter
   */
  getCurrentFiscalYearQuarterDates(): { start: NepaliDate; end: NepaliDate } {
    const currentQuarter = this.getCurrentFiscalYearQuarter();
    const currentFiscalYear = NepaliDate.getCurrentFiscalYear();

    return NepaliDate.getFiscalYearQuarter(currentQuarter, currentFiscalYear);
  }

  /**
   * Returns all quarters for a specified fiscal year
   * @param fiscalYear Fiscal year (defaults to current fiscal year if not specified)
   * @returns Object containing start and end dates for each quarter of the fiscal year
   */
  static getFiscalYearQuarters(fiscalYear?: number): {
    Q1: { start: NepaliDate; end: NepaliDate };
    Q2: { start: NepaliDate; end: NepaliDate };
    Q3: { start: NepaliDate; end: NepaliDate };
    Q4: { start: NepaliDate; end: NepaliDate };
  } {
    const year = fiscalYear ?? NepaliDate.getCurrentFiscalYear();

    return {
      Q1: NepaliDate.getFiscalYearQuarter(1, year),
      Q2: NepaliDate.getFiscalYearQuarter(2, year),
      Q3: NepaliDate.getFiscalYearQuarter(3, year),
      Q4: NepaliDate.getFiscalYearQuarter(4, year),
    };
  }
}
