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

#### Setters
```ts
setYear(year: number): void;
setMonth(month: number): void;
setDate(day: number): void;
set(year: number, month: number, day: number): void;
```
- Updates the Nepali date components and synchronizes the internal timestamp.

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


#### Date Manipulation
```ts
addDays(days: number): NepaliDate;
addMonths(months: number): NepaliDate;
addYears(years: number): NepaliDate;
```
- Adds a specified number of days, months, or years to the date and returns a new `NepaliDate` instance.


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

## Error Handling
- Throws an error if an invalid date format is used.
- Throws an error if the Nepali date is out of range.

## License
MIT License

