export interface MonthOption {
  value: string;
  label: string;
}

export interface YearOption {
  value: string;
  label: string;
}

export function getMonthOptions(): MonthOption[] {
  const options: MonthOption[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = date.toISOString().slice(0, 7);
    const label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    options.push({ value, label });
  }
  return options;
}

export function getYearOptions(): YearOption[] {
  const options: YearOption[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 5; i++) {
    const year = currentYear - i;
    options.push({ value: year.toString(), label: year.toString() });
  }
  return options;
}

export function filterByMonth<T extends { date: bigint }>(items: T[], month: string): T[] {
  const [year, monthNum] = month.split('-').map(Number);
  return items.filter((item) => {
    const date = new Date(Number(item.date) / 1000000);
    return date.getFullYear() === year && date.getMonth() + 1 === monthNum;
  });
}

export function filterByYear<T extends { date: bigint }>(items: T[], year: string): T[] {
  const yearNum = parseInt(year);
  return items.filter((item) => {
    const date = new Date(Number(item.date) / 1000000);
    return date.getFullYear() === yearNum;
  });
}
