import { normalizeDate } from '../../store/events'; // Import the function to be tested

describe('normalizeDate', () => {
  it('should correctly normalize a date', () => {
    const date = '2023-04-08T14:30:00Z'; // Input date
    const expectedOutput = 'Saturday, April 08 at 14:30'; // Expected output after normalization

    const result = normalizeDate(date); // Call the function with the input date
    expect(result).toEqual(expectedOutput); // Assert that the actual output matches the expected output
  });

  it('should handle invalid date inputs', () => {
    const date = 'invalid-date'; // Invalid input date
    const expectedOutput = 'undefined, undefined Invalid date at Invalid date'; // Expected output for invalid inputs

    const result = normalizeDate(date); // Call the function with the invalid input date
    expect(result).toEqual(expectedOutput); // Assert that the actual output matches the expected output
  });
});
