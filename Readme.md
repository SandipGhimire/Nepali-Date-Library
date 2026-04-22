# Nepali Date Library Ecosystem 🇳🇵

[![Support](https://img.shields.io/badge/Support-Bikram%20Sambat-red.svg)](#)
[![Platforms](https://img.shields.io/badge/Platforms-NodeJS%20%7C%20Python-blue.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

A comprehensive, multi-language ecosystem for working with **Nepali (Bikram Sambat)** dates. This repository serves as the central hub for various language-specific implementations and the official documentation.

---

## 🚀 Implementations

This project is organized into multiple submodules, each targeting a specific language or purpose:

### 📦 [NodeJS Library](./NodeJS)

The core **TypeScript/JavaScript** library for BS/AD conversion, manipulation, and formatting.

- **Installation**: `npm install nepali-date-library`
- **Source**: [Nepali-Date-Library-NodeJS](https://github.com/SandipGhimire/Nepali-Date-Library-NodeJS)

### 🐍 [Python Library](./Python)

The **Python** port of the `NepaliDate` library, offering consistent functionality for Python applications.

- **Installation**: `pip install nepali-date-library`
- **Source**: [Nepali-Date-Library-Python](https://github.com/SandipGhimire/Nepali-Date-Library-Python)

### 📚 [Documentation Hub](./Docs)

The central source of truth for all implementations, providing detailed API references, guides, and examples.

- **Website**: [nepalidate.sandip-ghimire.com.np](https://nepalidate.sandip-ghimire.com.np)
- **Source**: [Nepali-Date-Library-Docs](https://github.com/SandipGhimire/Nepali-Date-Library-Docs)

---

## ✨ Key Features

- **Bidirectional Conversion**: Seamlessly convert between Gregorian (AD) and Bikram Sambat (BS) dates.
- **Extensive Validation**: Range support from **1976/01/01 to 2100/12/31 BS**.
- **Date Arithmetic**: Add/subtract days, months, and years with ease.
- **Fiscal Year Support**: Built-in logic for Nepali fiscal years and quarters.
- **Formatting**: Customizable date formatting (e.g., `YYYY-MM-DD`, `DD MMMM YYYY`).
- **Standardized API**: Consistent API design across all language implementations.

---

## 🛠 Usage Preview

#### Node JS

```ts
import { NepaliDate } from "nepali-date-library";

const date = new NepaliDate();
console.log(date.format("YYYY-MM-DD"));
```

#### Python

```python
from nepali_date_library import NepaliDate

date = NepaliDate()
print(date.format("YYYY-MM-DD"))
```

---

## 🤝 Contributing

Contributions are welcome across all components of the ecosystem! Please refer to the specific submodule's directory for development instructions.

## 📄 License

This project and its submodules are licensed under the **MIT License**.
