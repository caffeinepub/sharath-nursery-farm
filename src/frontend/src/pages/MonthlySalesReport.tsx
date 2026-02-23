import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetAllSales, useGetAllExpenses, useGetAllDeadPlants } from '../hooks/useQueries';
import { MetricsCards } from '../components/reports/MetricsCards';
import { TopProducts } from '../components/reports/TopProducts';
import { DailySalesChart } from '../components/reports/DailySalesChart';
import { getMonthOptions, filterByMonth } from '../lib/reportUtils';

export default function MonthlySalesReport() {
  const { data: sales = [] } = useGetAllSales();
  const { data: expenses = [] } = useGetAllExpenses();
  const { data: deadPlants = [] } = useGetAllDeadPlants();
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  
  const monthOptions = getMonthOptions();
  const filteredSales = filterByMonth(sales, selectedMonth);
  const filteredExpenses = filterByMonth(expenses, selectedMonth);
  const filteredDeadPlants = filterByMonth(deadPlants, selectedMonth);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-nursery-primary">Monthly Sales Report</h1>
          <p className="text-muted-foreground">Detailed monthly performance analysis</p>
        </div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <MetricsCards
        sales={filteredSales}
        expenses={filteredExpenses}
        deadPlants={filteredDeadPlants}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-nursery-primary">Daily Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <DailySalesChart sales={filteredSales} month={selectedMonth} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-nursery-primary">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <TopProducts sales={filteredSales} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
