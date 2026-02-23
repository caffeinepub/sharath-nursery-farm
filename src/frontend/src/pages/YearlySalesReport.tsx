import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetAllSales, useGetAllExpenses, useGetAllDeadPlants } from '../hooks/useQueries';
import { MonthlyBreakdownTable } from '../components/reports/MonthlyBreakdownTable';
import { YearComparisonChart } from '../components/reports/YearComparisonChart';
import { YoYGrowth } from '../components/reports/YoYGrowth';
import { getYearOptions, filterByYear } from '../lib/reportUtils';

export default function YearlySalesReport() {
  const { data: sales = [] } = useGetAllSales();
  const { data: expenses = [] } = useGetAllExpenses();
  const { data: deadPlants = [] } = useGetAllDeadPlants();
  
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  
  const yearOptions = getYearOptions();
  const filteredSales = filterByYear(sales, selectedYear);
  const filteredExpenses = filterByYear(expenses, selectedYear);
  const filteredDeadPlants = filterByYear(deadPlants, selectedYear);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-nursery-primary">Yearly Sales Report</h1>
          <p className="text-muted-foreground">Annual performance overview</p>
        </div>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <YoYGrowth
        currentYearSales={filteredSales}
        previousYearSales={filterByYear(sales, (parseInt(selectedYear) - 1).toString())}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-nursery-primary">Monthly Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyBreakdownTable
            sales={filteredSales}
            expenses={filteredExpenses}
            deadPlants={filteredDeadPlants}
            year={selectedYear}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-nursery-primary">Revenue & Profit Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <YearComparisonChart
            sales={filteredSales}
            expenses={filteredExpenses}
            deadPlants={filteredDeadPlants}
            year={selectedYear}
          />
        </CardContent>
      </Card>
    </div>
  );
}
