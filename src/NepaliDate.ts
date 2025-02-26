import { EPOCH, MONTH_EN, MONTH_NP, MONTH_SHORT_EN, MONTH_SHORT_NP, NEPALI_DATE_MAP, WEEK_EN, WEEK_NP, WEEK_SHORT_EN, WEEK_SHORT_NP } from './Helper/Constants';
import format from './Helper/DateFormatter';

/**
 * Parses a date string into Nepali date components
 * @param dateString Date string in format YYYY-MM-DD, YYYY/MM/DD, or YYYY.MM.DD
 * @returns Tuple containing [year, month, day] where month is 0-indexed
 * @throws Error if the date format is invalid or date is out of range
 * @private
 */
function _parse(dateString: string): [number, number, number] {
    const parts = dateString.split(/[-./]/, 3);

    const [year, month = 0, day = 1] = parts.map(d => {
        const n = parseInt(d, 10);
        if (Number.isNaN(n)) {
            throw new Error('Invalid date');
        }
        return n;
    });

    if (year < NEPALI_DATE_MAP[0].year || year >= NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length) {
        throw new Error('Nepal year out of range');
    }

    if (month < 0 || month > 11) {
        throw new Error('Invalid nepali month must be between 0 - 11');
    }

    const daysInMonth = NEPALI_DATE_MAP[year - NEPALI_DATE_MAP[0].year].days[month - 1]
    if (day < 1 || day > daysInMonth) {
        throw new Error(`Invalid nepali date must be between 1 - ${daysInMonth} in ${year} ${month}`);
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
     * Creates a NepaliDate instance for the current date
     */
    constructor();

    /**
     * Creates a NepaliDate instance from various input types
     * @param date Source date as Date, NepaliDate, timestamp number, or date string
     */
    constructor(date: Date | NepaliDate | number | string);

    /**
     * Creates a NepaliDate instance with the specified year, month, and day
     * @param year Nepali year
     * @param month Nepali month (0-11)
     * @param day Nepali day (1-32)
     */
    constructor(year: number, month: number, day: number);
    constructor(...args: any[]) {
        if (args.length === 0) {
            this.setEnglishDate(new Date());
        } else if (args.length === 1) {
            const e = args[0];
            if (typeof e === 'object') {
                if (e instanceof Date) {
                    this.setEnglishDate(e);
                } else if (e instanceof NepaliDate) {
                    this.timestamp = e.timestamp;
                    this.year = e.year;
                    this.month = e.month;
                    this.day = e.day;
                } else {
                    throw new Error('Invalid date argument');
                }
            } else if (typeof e === 'string') {
                this.set(..._parse(e));
            } else if (typeof e === 'number') {
                this.setEnglishDate(new Date(e));
            } else {
                throw new Error('Invalid date argument');
            }
        } else if (args.length === 3) {
            this.set(args[0], args[1], args[2]);
        } else {
            throw new Error('Invalid argument syntax');
        }
    }

    /**
     * Sets the internal properties based on the provided English (Gregorian) date
     * @param date JavaScript Date object
     * @private
     */
    private setEnglishDate(date: Date): void {
        this.timestamp = date;
        let daysCount = Math.floor((this.timestamp.getTime() - EPOCH) / 86400000);
        let idx = Math.floor(daysCount / 366);

        while (daysCount >= NEPALI_DATE_MAP[idx].daysTillNow) {
            idx += 1;
        }

        let prevTillNow = NEPALI_DATE_MAP[idx - 1] ? NEPALI_DATE_MAP[idx - 1].daysTillNow : 0;

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
        const tmp = NEPALI_DATE_MAP[idx];
        let d = tmp.daysTillNow - tmp.totalDays;

        const m = month % 12;
        const mm = m < 0 ? 12 + m : m;

        for (let i = 0; i < mm; i += 1) {
            d += tmp.days[i];
        }
        d += date - 1;
        this.setEnglishDate(new Date(EPOCH + d * 86400000));
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
        return `${this.year}/${this.month + 1}/${this.day}`;
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
            throw new Error('Resulting date is out of supported range');
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

        if (newYear < NEPALI_DATE_MAP[0].year ||
            newYear >= NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length) {
            throw new Error('Resulting date is out of supported range');
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
    public diff(date: NepaliDate, unit: 'year' | 'month' | 'day'): number {
        switch (unit) {
            case 'day':
                return Math.floor((this.timestamp.getTime() - date.timestamp.getTime()) / 86400000);

            case 'month':
                const yearDiff = this.year - date.year;
                const monthDiff = this.month - date.month;
                return yearDiff * 12 + monthDiff;

            case 'year':
                return this.year - date.year;

            default:
                throw new Error('Invalid unit for diff calculation');
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
    public static getMonthName(month: number, short: boolean = false, nepali: boolean = false): string {
        if (month < 0 || month > 11) {
            throw new Error('Invalid month index, must be between 0-11');
        }
        let result = '';
        if(nepali){
            result = short ? MONTH_SHORT_NP[month] : MONTH_NP[month]
        }else{
            result = short ? MONTH_SHORT_EN[month] : MONTH_EN[month]
        }

        return result;
    }

    /**
     * Returns the name of the specified day of week
     * @param day Day of week (0-6, where 0 is Sunday)
     * @param short Whether to return the short form of the day name
     * @returns Day name in Nepali or English
     */
    public static getDayName(day: number, short: boolean = false, nepali: boolean = false): string {
        if (day < 0 || day > 6) {
            throw new Error('Invalid day index, must be between 0-6');
        }

        let result = '';
        if(nepali){
            result = short ? WEEK_SHORT_NP[day] : WEEK_NP[day]
        }else{
            result = short ? WEEK_SHORT_EN[day] : WEEK_EN[day]
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
            if (year < NEPALI_DATE_MAP[0].year ||
                year >= NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length) {
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
        } catch (error) {
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
     * @returns Array of day objects with date and isCurrentMonth flag
     */
    public static getCalendarDays(year: number, month: number): { date: number, isCurrentMonth: boolean }[] {
        if (!NepaliDate.isValid(year, month, 1)) {
            throw new Error('Invalid year or month');
        }

        const result: { date: number, isCurrentMonth: boolean }[] = [];
        const yearIndex = year - NEPALI_DATE_MAP[0].year;

        const firstDay = new NepaliDate(year, month, 1);
        const firstDayOfWeek = firstDay.getDay();

        const daysInMonth = NEPALI_DATE_MAP[yearIndex].days[month];

        if (firstDayOfWeek > 0) {
            let prevMonth = month - 1;
            let prevYear = year;
            if (prevMonth < 0) {
                prevMonth = 11;
                prevYear--;
            }

            if (prevYear >= NEPALI_DATE_MAP[0].year) {
                const prevMonthIndex = prevYear - NEPALI_DATE_MAP[0].year;
                const daysInPrevMonth = NEPALI_DATE_MAP[prevMonthIndex].days[prevMonth];

                for (let i = 0; i < firstDayOfWeek; i++) {
                    result.push({
                        date: daysInPrevMonth - firstDayOfWeek + i + 1,
                        isCurrentMonth: false
                    });
                }
            }
        }

        for (let i = 1; i <= daysInMonth; i++) {
            result.push({
                date: i,
                isCurrentMonth: true
            });
        }

        const remainingDays = 42 - result.length;

        if (remainingDays > 0) {
            let nextMonth = month + 1;
            let nextYear = year;
            if (nextMonth > 11) {
                nextMonth = 0;
                nextYear++;
            }

            if (nextYear < NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length) {
                for (let i = 1; i <= remainingDays; i++) {
                    result.push({
                        date: i,
                        isCurrentMonth: false
                    });
                }
            }
        }

        return result;
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
        return this.year === date.year &&
            this.month === date.month &&
            this.day === date.day;
    }

    /**
     * Checks if this date is the same as the specified date for the given unit
     * @param date Date to compare with
     * @param unit Unit to use for comparison ('year', 'month', or 'day')
     * @returns true if dates are the same for the specified unit, false otherwise
     */
    public isSame(date: NepaliDate, unit: 'year' | 'month' | 'day'): boolean {
        switch (unit) {
            case 'year':
                return this.year === date.year;

            case 'month':
                return this.year === date.year && this.month === date.month;

            case 'day':
                return this.isEqual(date);

            default:
                throw new Error('Invalid unit for comparison');
        }
    }
}