# NepaliDate Library

## Overview
The `NepaliDate` library provides a proper way to work with Nepali (Bikram Sambat) dates in TypeScript/JavaScript. It allows you to create, manipulate, format, and convert between Nepali and Gregorian dates with support for fiscal years, quarters, and extensive date operations.

## Installation
```sh
npm install nepali-date-library
```

## Importing the Library
```ts
import { NepaliDate, ADtoBS, BStoAD } from 'nepali-date-library';
```

## Class: `NepaliDate`

### Constructors
```ts
new NepaliDate();
new NepaliDate(date: Date | NepaliDate | number | string);
new NepaliDate(year: number, month: number, day: number);
```
- Creates a `NepaliDate` instance.
- Accepts either no arguments (current date), a JavaScript `Date`, another `NepaliDate`, a timestamp, or a formatted date string.
- Can also accept year, month (0-11), and day (1-32) as separate arguments.

### Date Conversion Functions

#### Pre-built Conversion Functions
```ts
import { ADtoBS, BStoAD } from 'nepali-date-library';

// Convert AD to BS
const bsDate = ADtoBS('2025-02-22');  // Returns: '2081-10-10'

// Convert BS to AD
const adDate = BStoAD('2081-10-14');  // Returns: '2025-02-26'
```

#### Class Method
```ts
const nepaliDate = new NepaliDate();
const adDate = nepaliDate.getEnglishDate();  // Returns JavaScript Date object
```

---

### Getters
```ts
getYear(): number;          // Returns Nepali year
getMonth(): number;         // Returns Nepali month (0-11)
getDate(): number;          // Returns Nepali day (1-32)
getDay(): number;           // Returns day of week (0-6, 0 = Sunday)
getHours(): number;         // Returns hour (0-23)
getMinutes(): number;       // Returns minutes (0-59)
getSeconds(): number;       // Returns seconds (0-59)
getMilliseconds(): number;  // Returns milliseconds (0-999)
getTime(): number;          // Returns timestamp in milliseconds
```

---

### Setters
```ts
setYear(year: number): void;
setMonth(month: number): void;
setDate(day: number): void;
set(year: number, month: number, day: number): void;
```
- Updates the Nepali date components and synchronizes the internal timestamp.

---

### Parsing
```ts
parse(dateString: string): void;
```
- Parses a date string and updates the current instance
- Supports formats: YYYY-MM-DD, YYYY/MM/DD, or YYYY.MM.DD

---

### Formatting
```ts
format(formatStr: string): string;
toString(): string;  // Returns format: YYYY/MM/DD (1-indexed month)
```

#### Available Format Tokens:
- **English Formats:**
  - `YYYY` - Full Year (e.g., 2080)
  - `MM` - Month with leading zero (01-12)
  - `M` - Month without leading zero (1-12)
  - `MMM` - Short month name (Bai, Cha)
  - `MMMM` - Long month name (Baisakh, Chaitra)
  - `DD` - Day with leading zero (01-32)
  - `D` - Day without leading zero (1-32)
  - `DDD` - Short day name (Sun, Sat)
  - `DDDD` - Full day name (Sunday)

- **Nepali Formats:**
  - `yyyy` - Full Year (e.g., २०८१)
  - `mm` - Month with leading zero (०१-१२)
  - `m` - Month without leading zero (१-१२)
  - `mmm` - Short month name (बै, चै)
  - `mmmm` - Long month name (बैशाख, चैत्र)
  - `dd` - Day with leading zero (०१-३२)
  - `d` - Day without leading zero (१-३२)
  - `ddd` - Short day name (आइत, शनि)
  - `dddd` - Full day name (आइतबार)

---

### Date Manipulation
```ts
addDays(days: number): NepaliDate;
addMonths(months: number): NepaliDate;
addYears(years: number): NepaliDate;
```
- Adds a specified number of days, months, or years to the date and returns a new `NepaliDate` instance.

---

### Date Information Methods

#### `daysInMonth(): number`
Returns the number of days in the current month.

#### `isLeapYear(): boolean`
Checks if the current year is a leap year in the Nepali calendar.

#### `getWeeksInMonth(): number`
Calculates the number of weeks in the current month.

---

### Date Comparison Methods

#### `diff(date: NepaliDate, unit: 'year' | 'month' | 'day'): number`
Calculates the difference between two `NepaliDate` instances.

#### `isAfter(date: NepaliDate): boolean`
Checks if this date comes after the specified date.

#### `isBefore(date: NepaliDate): boolean`
Checks if this date comes before the specified date.

#### `isEqual(date: NepaliDate): boolean`
Checks if this date is exactly equal to the specified date (year, month, day).

#### `isSame(date: NepaliDate, unit: 'year' | 'month' | 'day'): boolean`
Checks if this date is the same as the specified date for the given unit.

---

### Date Range Methods

#### `startOfDay(): NepaliDate`
Returns a new `NepaliDate` representing the start of the current day (00:00:00).

#### `endOfDay(): NepaliDate`
Returns a new `NepaliDate` representing the end of the current day (23:59:59.999).

#### `startOfWeek(startOfWeek: number = 0): NepaliDate`
Returns a new `NepaliDate` representing the start of the week containing this date.
- `startOfWeek`: Day to consider as start of week (0-6, where 0 = Sunday, 1 = Monday, etc.)

#### `endOfWeek(startOfWeek: number = 0): NepaliDate`
Returns a new `NepaliDate` representing the end of the week containing this date.

#### `startOfMonth(): NepaliDate`
Returns a new `NepaliDate` representing the first day of the current month.

#### `endOfMonth(): NepaliDate`
Returns a new `NepaliDate` representing the last day of the current month.

#### `startOfYear(): NepaliDate`
Returns a new `NepaliDate` representing the first day of the current Nepali year (1st Baisakh).

#### `endOfYear(): NepaliDate`
Returns a new `NepaliDate` representing the last day of the current Nepali year (last day of Chaitra).

---

### Quarter and Fiscal Year Methods

#### `getCurrentQuarter(): number`
Returns the quarter number (1-4) for the current date.

#### `getCurrentFiscalYearQuarter(): number`
Returns the current fiscal year quarter number (1-4) for the current date.
- Fiscal year starts from Shrawan 1st (month 3, day 1)

#### `getCurrentFiscalYearQuarterDates(): { start: NepaliDate; end: NepaliDate }`
Returns the start and end dates of the current fiscal year quarter.

---

### Static Methods

#### Date Range Utilities
```ts
static minimum(): Date;  // Returns earliest supported date
static maximum(): Date;  // Returns latest supported date
```

#### Validation
```ts
static isValid(year: number, month: number, day: number): boolean;
isValid(): boolean;  // Instance method
```

#### Name Utilities
```ts
static getMonthName(month: number, short: boolean = false, nepali: boolean = false): string;
static getDayName(day: number, short: boolean = false, nepali: boolean = false): string;
```

#### Calendar Generation
```ts
static getCalendarDays(year: number, month: number): {
  prevRemainingDays: number,
  prevMonth: { year: number, month: number, days: number[] },
  currentMonth: { year: number, month: number, days: number[] },
  nextMonth: { year: number, month: number, days: number[] },
  remainingDays: number
}
```
Generates calendar days for a given month, including trailing/leading days from adjacent months.

#### Quarter Methods
```ts
static getQuarter(quarter: number, year?: number): { start: NepaliDate; end: NepaliDate };
static getQuarters(year?: number): {
  Q1: { start: NepaliDate; end: NepaliDate };
  Q2: { start: NepaliDate; end: NepaliDate };
  Q3: { start: NepaliDate; end: NepaliDate };
  Q4: { start: NepaliDate; end: NepaliDate };
};
```

#### Fiscal Year Methods
```ts
static getCurrentFiscalYear(): number;
static getFiscalYearQuarter(quarter: number, fiscalYear?: number): { start: NepaliDate; end: NepaliDate };
static getFiscalYearQuarters(fiscalYear?: number): {
  Q1: { start: NepaliDate; end: NepaliDate };
  Q2: { start: NepaliDate; end: NepaliDate };
  Q3: { start: NepaliDate; end: NepaliDate };
  Q4: { start: NepaliDate; end: NepaliDate };
};
```

#### Utility Methods
```ts
clone(): NepaliDate;  // Creates a copy of the current instance
```

---

## Example Usage

### Basic Usage
```ts
const today = new NepaliDate();
console.log(today.toString()); // 2081/10/15

const formatted = today.format('YYYY-MM-DD');
console.log(formatted); // 2081-10-15

const nepaliFormatted = today.format('yyyy-mm-dd');
console.log(nepaliFormatted); // २०८१-१०-१५
```

### Date Manipulation
```ts
const date = new NepaliDate(2081, 9, 15);
const futureDate = date.addDays(10);
const pastDate = date.addMonths(-2);
const nextYear = date.addYears(1);
```

### Date Comparison
```ts
const date1 = new NepaliDate(2081, 5, 10);
const date2 = new NepaliDate(2081, 5, 15);

console.log(date1.isBefore(date2)); // true
console.log(date1.diff(date2, 'day')); // -5
console.log(date1.isSame(date2, 'month')); // true
```

### Working with Quarters
```ts
// Get current quarter
const currentQuarter = new NepaliDate().getCurrentQuarter();

// Get fiscal year quarter
const fiscalQuarter = new NepaliDate().getCurrentFiscalYearQuarter();

// Get all quarters for a year
const quarters = NepaliDate.getQuarters(2081);
console.log(quarters.Q1); // { start: NepaliDate, end: NepaliDate }

// Get fiscal year quarters
const fiscalQuarters = NepaliDate.getFiscalYearQuarters(2081);
```

### Calendar Generation
```ts
const calendarData = NepaliDate.getCalendarDays(2081, 4);
console.log(calendarData.currentMonth.days); // [1, 2, 3, ..., 30]
console.log(calendarData.prevMonth.days); // Days from previous month
```

### Date Range Operations
```ts
const date = new NepaliDate(2081, 5, 15);

const startOfWeek = date.startOfWeek(); // Sunday of current week
const endOfWeek = date.endOfWeek(); // Saturday of current week
const startOfMonth = date.startOfMonth(); // 1st day of current month
const endOfYear = date.endOfYear(); // Last day of current year
```

### Validation
```ts
// Static validation
console.log(NepaliDate.isValid(2081, 4, 32)); // false (day out of range)

// Instance validation
const date = new NepaliDate(2081, 5, 10);
console.log(date.isValid()); // true
```

### Name Utilities
```ts
// Month names
console.log(NepaliDate.getMonthName(0, false, false)); // "Baisakh"
console.log(NepaliDate.getMonthName(0, true, true)); // "बै"

// Day names
console.log(NepaliDate.getDayName(0, false, true)); // "आइतबार"
console.log(NepaliDate.getDayName(1, true, false)); // "Mon"
```

---

## Error Handling
- Throws an error if an invalid date format is used in constructor or parse method
- Throws an error if the Nepali date is out of the supported range
- Validates input parameters and throws appropriate errors for invalid values

## Supported Date Range
The library supports Nepali dates within a specific range. Use `NepaliDate.minimum()` and `NepaliDate.maximum()` to get the supported date boundaries.

## Acknowledgements
This project was inspired by [nepali-date](https://github.com/sharingapples/nepali-date).

## License
MIT License