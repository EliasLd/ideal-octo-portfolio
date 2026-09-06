export function formatDateRange(startDateStr: string, endDateStr?: string): string {
  const formatOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric'
  };

  const formatter = new Intl.DateTimeFormat('en-US', formatOptions);

  const start = formatter.format(new Date(startDateStr));

  // No end date means current
  const end = endDateStr ? formatter.format(new Date(endDateStr)) : 'Present';

  return `${start} — ${end}`;
}
