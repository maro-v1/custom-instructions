/**
 * Formats an ISO date string to UK display format (dd/MM/yyyy).
 */
export function formatDateForDisplay(isoDate: string): string {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Returns true if the given date is in the past.
 */
export function isDateInPast(isoDate: string): boolean {
  return new Date(isoDate) < new Date();
}

/**
 * Calculates business days between two dates (excludes weekends).
 */
export function businessDaysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;
  const current = new Date(start);
  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  return count;
}
