import { businessDaysBetween, formatDateForDisplay, isDateInPast } from './date-utils';

describe('DateUtils', () => {
  describe('formatDateForDisplay', () => {
    it('should format ISO date to dd/MM/yyyy', () => {
      const result = formatDateForDisplay('2025-03-15T00:00:00Z');
      expect(result).toBe('15/03/2025');
    });

    it('should pad single digit day and month', () => {
      const result = formatDateForDisplay('2025-01-05T00:00:00Z');
      expect(result).toBe('05/01/2025');
    });
  });

  describe('isDateInPast', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-06-15T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return true for a date in the past', () => {
      expect(isDateInPast('2025-01-01T00:00:00Z')).toBe(true);
    });

    it('should return false for a date in the future', () => {
      expect(isDateInPast('2025-12-31T00:00:00Z')).toBe(false);
    });
  });

  describe('businessDaysBetween', () => {
    it('should count only weekdays between two dates', () => {
      // Monday 2025-03-10 to Friday 2025-03-14 = 5 business days
      const result = businessDaysBetween('2025-03-10', '2025-03-14');
      expect(result).toBe(5);
    });

    it('should exclude weekends', () => {
      // Monday 2025-03-10 to Monday 2025-03-17 = 6 business days (excludes Sat + Sun)
      const result = businessDaysBetween('2025-03-10', '2025-03-17');
      expect(result).toBe(6);
    });
  });
});
