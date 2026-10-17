# Nepali Date Library Ecosystem 🇳🇵

[![Website](https://img.shields.io/badge/Documentation-nepali--pkg.date-E1804B?style=for-the-badge&logo=google-chrome&logoColor=white)](https://nepali-pkg.date)
[![Converter](https://img.shields.io/badge/Converter-Live%20Suite-24292E?style=for-the-badge)](https://nepali-pkg.date/converter)
[![Platforms](https://img.shields.io/badge/Platforms-NodeJS%20%7C%20Python%20%7C%20PHP-3178C6?style=for-the-badge)](#-implementations)
[![License: MIT](https://img.shields.io/badge/License-MIT-27845A?style=for-the-badge)](./LICENSE)

A high-performance, standardized multi-language ecosystem and **Nepali Date Converter** for working with **Nepali (Bikram Sambat / BS)** dates, fiscal years, date arithmetic, and bidirectional Gregorian (AD) conversions.

Supported range: **1976/01/01 to 2100/12/31 BS** (1919-03-13 to 2044-04-12 AD).

---

### 🌐 Central Documentation & Interactive Suite

Visit our official web portal for full API references, interactive conversion tools, and multi-language tutorials:

👉 **[https://nepali-pkg.date](https://nepali-pkg.date)**  
🔄 **[Interactive BS ↔ AD Date & Age Converter](https://nepali-pkg.date/converter)**

---

## 🚀 Implementations

| Package | Language | Installation | Documentation | Source Code |
| :--- | :--- | :--- | :--- | :--- |
| **`nepali-date-library`** | TypeScript / JS | `npm i nepali-date-library` | [Docs / NodeJS](https://nepali-pkg.date/docs/nodejs) | [`./NodeJS`](./NodeJS) |
| **`nepali-date-library`** | Python 3.9+ | `pip install nepali-date-library` | [Docs / Python](https://nepali-pkg.date/docs/python) | [`./Python`](./Python) |
| **`sghimire/nepali-date-library`** | PHP 7.1 - 8.5+ | `composer require sghimire/nepali-date-library` | [Docs / PHP](https://nepali-pkg.date/docs/php) | [`./PHP`](./PHP) |
| **`Docs Engine`** | Next.js 16 / Fumadocs | — | [nepali-pkg.date](https://nepali-pkg.date) | [`./Docs`](./Docs) |

---

## 🛠️ Quick Snippet

```ts
// 📦 Node.js / TypeScript
import { NepaliDate } from "nepali-date-library";
const today = new NepaliDate();
console.log(today.format("YYYY-MM-DD")); // "2081-07-01"
```

> **For complete guides, Devanagari tokens, date arithmetic, and fiscal year logic**:  
> 👉 Visit the official documentation at **[https://nepali-pkg.date](https://nepali-pkg.date)**

---

## 🤝 Contributing

Contributions are welcome across all submodules! Please check our [**Contributing Guide**](./CONTRIBUTING.md) or the [**Docs Contribution Guide**](https://nepali-pkg.date/docs/contribution).

---

## 📄 License

The entire Nepali Date Library ecosystem is open-source software licensed under the [MIT License](./LICENSE).  
Made with ❤️ by [Sandip Ghimire](https://github.com/SandipGhimire).
