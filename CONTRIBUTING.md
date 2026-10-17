# Contributing to the Nepali Date Ecosystem 🇳🇵

Thank you for your interest in contributing to the **Nepali Date (Bikram Sambat) Ecosystem**! This project provides synchronized, robust, zero-dependency calendar tools across JavaScript/TypeScript, Python, and PHP, backed by our central documentation and converter suite at [**https://nepali-pkg.date**](https://nepali-pkg.date).

---

## 🧭 Repository Structure

This repository acts as an umbrella hub containing four primary components:

| Subdirectory | Target Platform | Description | Contributing Guide |
| :--- | :--- | :--- | :--- |
| [`./NodeJS`](./NodeJS) | Node.js, Bun, Deno, Browsers | TypeScript/JavaScript library | [NodeJS Guide](./NodeJS/CONTRIBUTING.md) |
| [`./Python`](./Python) | Python 3.9+ | Python library | [Python Guide](./Python/CONTRIBUTING.md) |
| [`./PHP`](./PHP) | PHP 7.1 - 8.5+ | PHP / Composer library | [PHP Guide](./PHP/CONTRIBUTING.md) |
| [`./Docs`](./Docs) | Web / Next.js 16 | Documentation & Interactive Converter | [Docs Guide](./Docs/CONTRIBUTING.md) |

---

## 🛠️ General Contribution Guidelines

1. **API Consistency**:
   - The ecosystem strives for identical API conventions across all language implementations wherever platform idioms permit (e.g. `format()`, `addDays()`, `getFiscalYear()`, `ADtoBS()`, `BStoAD()`).
   - If adding a new calendar feature or fixing a date calculation edge case, consider proposing the improvement across all three languages.

2. **Test Coverage**:
   - Every library port maintains an exhaustive test suite verifying bidirectional conversion across all supported years (**1976/01/01 to 2100/12/31 BS**).
   - Any modifications to date logic must be accompanied by unit tests.

3. **Documentation Updates**:
   - If you modify or introduce an API method, please update or add the corresponding documentation under [`Docs/content/docs/`](./Docs/content/docs/).

---

## 🚀 Getting Started

To work on a specific project, navigate to its directory and follow its dedicated development guide:

```bash
# Node.js / TypeScript
cd NodeJS
pnpm install
pnpm test

# Python
cd Python
uv sync --group dev
uv run task test

# PHP
cd PHP
composer install
composer test

# Docs Engine
cd Docs
pnpm install
pnpm dev
```

---

## 📄 License

The entire Nepali Date Library ecosystem is open-source software licensed under the [MIT License](./LICENSE).  
Made with ❤️ by [Sandip Ghimire](https://github.com/SandipGhimire).

