# NepaliDate Library

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/SandipGhimire/Nepali-Date-Library/blob/master/LICENSE)
[![Docs](https://img.shields.io/badge/Docs-Official%20Wiki-blue)](https://nepalidate.sandip-ghimire.com.np)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black)](https://github.com/SandipGhimire/nepali-date-library)

## Overview

The `NepaliDate` library provides a proper way to work with Nepali (Bikram Sambat) dates in TypeScript/JavaScript. It allows you to create, manipulate, format, and convert between Nepali Bikram Sambat date (1976/01/01 - 2100/12/31) and Gregorian dates (1919-03-13 - 2044-04-12) with support for fiscal years, quarters, and extensive date operations.

## 📚 Documentation

For detailed guides, API references, and examples, please visit our **official Wiki**:

👉 **[nepalidate.sandip-ghimire.com](https://github.com/SandipGhimire/nepali-date-library)**

## Installation

```sh
npm install nepali-date-library
```

## Quick Start

```ts
import { NepaliDate, ADtoBS, BStoAD } from "nepali-date-library";

const now = new NepaliDate();
console.log(now.format("YYYY-MM-DD"));
```

For more advanced usage, please refer to the [Wiki](https://nepalidate.sandip-ghimire.com).

## License

[MIT](https://choosealicense.com/licenses/mit/)
