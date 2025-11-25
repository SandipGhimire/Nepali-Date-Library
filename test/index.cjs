const { NepaliDate, BStoAD, ADtoBS } = require("../dist/index.mjs");

const nepali = new NepaliDate("2000-10-10");
const english = BStoAD(nepali.format("YYYY-MM-DD"));
console.log(ADtoBS(english));