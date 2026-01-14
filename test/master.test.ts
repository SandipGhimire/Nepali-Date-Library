import { NepaliDate } from "../src/NepaliDate";
import { NEPALI_DATE_MAP } from "../src/Helper/Constants";

describe("Master Test Case: Full Range Verification (1976 - 2100)", () => {
  // Test Every Year Date from Start to End of Nepali Date Map
  // Converts the Date to English Date and then back to Nepali Date
  // Check if the converted Nepali Date is the same as the original Nepali Date

  it("should maintain consistency for every day in the supported range", () => {
    const startYear = NEPALI_DATE_MAP[0].year;
    const endYear = startYear + NEPALI_DATE_MAP.length - 1;

    console.log(`Starting Master Verification from ${startYear} to ${endYear}...`);

    let totalDaysChecked = 0;

    for (let i = 0; i < NEPALI_DATE_MAP.length; i++) {
      const yearData = NEPALI_DATE_MAP[i];
      const year = yearData.year;

      for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        const daysInMonth = yearData.days[monthIndex];

        for (let day = 1; day <= daysInMonth; day++) {
          totalDaysChecked++;

          // 1. Create Nepali Date
          const originalBS = new NepaliDate(year, monthIndex, day);

          // 2. Convert to English Date
          const englishDate = originalBS.getEnglishDate();

          // 3. Convert back to Nepali Date from English Date
          const convertedBS = new NepaliDate(englishDate);

          // 4. Verification
          try {
            expect(convertedBS.getYear()).toBe(year);
            expect(convertedBS.getMonth()).toBe(monthIndex);
            expect(convertedBS.getDate()).toBe(day);
          } catch (e) {
            console.error(`FAILURE at BS Date: ${year}-${monthIndex + 1}-${day}`);
            console.error(`Converted English Date: ${englishDate.toISOString().split("T")[0]}`);
            console.error(
              `Re-converted BS Date: ${convertedBS.getYear()}-${convertedBS.getMonth() + 1}-${convertedBS.getDate()}`
            );
            throw e;
          }
        }
      }
    }

    console.log(`Successfully verified ${totalDaysChecked} days.`);
  });
});
