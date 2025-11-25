import { ADtoBS, BStoAD } from "./Helper/DateConverter";
import { NepaliDate } from "./NepaliDate";

const nepali = new NepaliDate("2000-10-10");

console.log(BStoAD(nepali.format("YYYY-MM-DD")));