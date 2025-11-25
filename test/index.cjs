const { NepaliDate, BStoAD, ADtoBS } = require("../dist/index.mjs");

console.log('Testing 2042-09-17:');
const nepali2 = new NepaliDate("2042-09-17");
const english2 = BStoAD(nepali2.format("YYYY-MM-DD"));
console.log('BS:', nepali2.format("YYYY-MM-DD"));
console.log('AD:', english2);
console.log('BS again:', ADtoBS(english2)); // Should be 2042-09-17

console.log('\nTesting 2042-09-18:');
const nepali = new NepaliDate("2042-09-18");
const english = BStoAD(nepali.format("YYYY-MM-DD"));
console.log('BS:', nepali.format("YYYY-MM-DD"));
console.log('AD:', english);
console.log('BS again:', ADtoBS(english)); 