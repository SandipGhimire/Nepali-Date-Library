# NepaliDate Library

## Overview
The `NepaliDate` library provides a way to work with Nepali (Bikram Sambat) dates in TypeScript/JavaScript. It allows you to create, manipulate, format, and convert between Nepali and Gregorian dates.

## Installation
```sh
npm install nepali-date-library
```

## Importing the Library
```ts
import { NepaliDate } from 'nepali-date-library';
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

### Methods
#### Date Conversion

```ts
//PreBuild Functions

import { ADtoBS, BStoAD } from 'nepali-date-library';
// Convert AD to BS
const bsDate = ADtoBS('2025-02-22');  // Returns: '2081-10-10'
// Convert BS to AD
const adDate = BStoAD('2081-10-14');  // Returns: '2025-02-26'

//Class Functions
const adDate = new NepaliDate().getEnglishDate();
```

---

#### Getters
```ts
getYear(): number;
getMonth(): number;
getDate(): number;
getDay(): number;
getHours(): number;
getMinutes(): number;
getSeconds(): number;
getMilliseconds(): number;
getTime(): number;
```
- Returns individual date components like year, month (0-11), day (1-32), and other time properties.

---

#### Setters
```ts
setYear(year: number): void;
setMonth(month: number): void;
setDate(day: number): void;
set(year: number, month: number, day: number): void;
```
- Updates the Nepali date components and synchronizes the internal timestamp.

---

#### Formatting
```ts
format(formatStr: string): string;
```
- Formats the date based on the provided format string.

- Available Formats:
  - English
    - YYYY - Full Year (e.g., 2080)
    - MM - Month with leading zero (01-12)
    - M - Month without leading zero (1-12)
    - MMM - Short month name (Bai, Cha)
    - MMMM - Long month name (Baisakh, Chaitra)
    - DD - Day with leading zero (01-32)
    - D - Day without leading zero (1-32)
    - DDD - Short day name (Sun, Sat)
    - DDDD - Full day name (Sunday)

  - Nepali
    - yyyy - Full Year (e.g., २०८१)
    - mm - Month with leading zero (०१-१२)
    - m - Month without leading zero (१-१२)
    - mmm - Short month name (बै, चै)
    - mmmm - Long month name (बैशाख, चैत्र)
    - dd - Day with leading zero (०१-३२)
    - d - Day without leading zero (१-३२)
    - ddd - Short day name (आइत, शनि)
    - dddd - Full day name (आइतबार)

----

#### Date Manipulation
```ts
addDays(days: number): NepaliDate;
addMonths(months: number): NepaliDate;
addYears(years: number): NepaliDate;
```
- Adds a specified number of days, months, or years to the date and returns a new `NepaliDate` instance.

---

### Additional Methods

#### `daysInMonth(): number`
Returns the number of days in the current month.

```ts
const date = new NepaliDate(2080, 5, 1);
console.log(date.daysInMonth()); // Outputs the number of days in the given month
```

#### `isLeapYear(): boolean`
Checks if the current year is a leap year in the Nepali calendar.

```ts
const date = new NepaliDate(2080, 1, 1);
console.log(date.isLeapYear()); // Returns true if it is a leap year
```

#### `getWeeksInMonth(): number`
Calculates the number of weeks in the current month.

```ts
const date = new NepaliDate(2080, 5, 1);
console.log(date.getWeeksInMonth()); // Outputs the number of weeks
```

#### `diff(date: NepaliDate, unit: 'year' | 'month' | 'day'): number`
Calculates the difference between two `NepaliDate` instances in the specified unit (`year`, `month`, or `day`).

```ts
const date1 = new NepaliDate(2080, 5, 10); // Example date
const date2 = new NepaliDate(2079, 5, 10); // Another example date

console.log(date1.diff(date2, 'day'));   // Outputs the difference in days
console.log(date1.diff(date2, 'month')); // Outputs the difference in months
console.log(date1.diff(date2, 'year'));  // Outputs the difference in years
```

#### `startOfDay(): NepaliDate`
Returns a new `NepaliDate` representing the start of the current day (00:00:00).

```ts
const date = new NepaliDate(2080, 5, 10);
console.log(date.startOfDay());
```

#### `endOfDay(): NepaliDate`
Returns a new `NepaliDate` representing the end of the current day (23:59:59.999).

```ts
const date = new NepaliDate(2080, 5, 10);
console.log(date.endOfDay());
```

#### `startOfMonth(): NepaliDate`
Returns a new `NepaliDate` representing the first day of the current month.

```ts
const date = new NepaliDate(2080, 5, 10);
console.log(date.startOfMonth());
```

#### `endOfMonth(): NepaliDate`
Returns a new `NepaliDate` representing the last day of the current month.

```ts
const date = new NepaliDate(2080, 5, 10);
console.log(date.endOfMonth());
```

#### `startOfYear(): NepaliDate`
Returns a new `NepaliDate` representing the first day of the current Nepali year (1st Baisakh).

```ts
const date = new NepaliDate(2080, 5, 10);
console.log(date.startOfYear());
```

#### `endOfYear(): NepaliDate`
Returns a new `NepaliDate` representing the last day of the current Nepali year (last day of Chaitra).

```ts
const date = new NepaliDate(2080, 5, 10);
console.log(date.endOfYear());
```

---

### Function Overview

#### `getMonthName(month: number, short: boolean, nepali: boolean): string`
##### Returns
Returns the name of the specified Nepali month in Nepali or English.

```ts
NepaliDate.getMonthName(2, false, false); // "Asar"
```

#### `getDayName(day: number, short: boolean, nepali: boolean): string`
##### Returns
Returns the name of the specified day of the week in Nepali or English.

```ts
NepaliDate.getDayName(0, false, true); // "आइतबार"
```

#### `isValid(year: number, month: number, day: number): boolean`
##### Returns
Checks if the specified Nepali date is valid.

```ts
NepaliDate.isValid(2080, 4, 20); // true
```

#### `getCalendarDays(year: number, month: number): Object`

##### Returns
Generates calendar days for a given month, including trailing/leading days from adjacent months. It returns an object containing the calendar days for the previous month, the current month, and the next month. Each month includes day objects with the date and a flag indicating whether the day belongs to the current month.

```ts
return { prevRemainingDays: number, prevMonth: { year: number, month: number, days: number[] }, currentMonth: { year: number, month: number, days: number[] }, nextMonth: { year: number, month: number, days: number[] }, remainingDays: number }
```

##### Parameters
- `year`: Nepali year (e.g., `2081`)
- `month`: Nepali month (0-11), where 0 represents the first month.

##### Example

```ts
NepaliDate.getCalendarDays(2081, 4);
```

#### `clone(): NepaliDate`
##### Returns
Creates a copy of the current `NepaliDate` instance.

```ts
const date = new NepaliDate(2080, 4, 20);
const clonedDate = date.clone();
```

#### `isAfter(date: NepaliDate): boolean`
##### Returns
Checks if this date comes after the specified date.

```ts
const date = new NepaliDate(2080, 4, 20);
date.isAfter(new NepaliDate(2080, 3, 15)); // true
```

#### `isBefore(date: NepaliDate): boolean`
##### Returns
Checks if this date comes before the specified date.

```ts
const date = new NepaliDate(2080, 4, 20);
date.isBefore(new NepaliDate(2080, 5, 10)); // true
```

#### `isEqual(date: NepaliDate): boolean`
##### Returns
Checks if this date is equal to the specified date.

```ts
const date = new NepaliDate(2080, 4, 20);
date.isEqual(new NepaliDate(2080, 4, 20)); // true
```

#### `isSame(date: NepaliDate, unit: 'year' | 'month' | 'day'): boolean`
##### Returns
Checks if this date is the same as the specified date for the given unit.

```ts
const date = new NepaliDate(2080, 4, 20);
date.isSame(new NepaliDate(2080, 4, 15), 'month'); // true
```

---

## Example Usage
```ts
const today = new NepaliDate();
console.log(today);

const formatted = today.format('YYYY-MM-DD');
console.log(formatted);

const futureDate = today.addDays(10);
console.log(futureDate);

const pastDate = today.addDays(-10);
console.log(pastDate);
```

### Acknowledgements
This project was inspired by [nepali-date](https://github.com/sharingapples/nepali-date).

## Error Handling
- Throws an error if an invalid date format is used.
- Throws an error if the Nepali date is out of range.

## License
MIT License