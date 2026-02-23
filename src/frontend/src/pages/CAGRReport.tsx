import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetAllSales, useGetAllExpenses, useGetAllDeadPlants } from '../hooks/useQueries';
import { CAGRMetrics } from '../components/reports/CAGRMetrics';
import { YoYComparisonTable } from '../components/reports/YoYComparisonTable';
import { CAGRTrendChart } from '../components/reports/CAGRTrendChart';
import { DeadLossImpact } from '../components/reports/DeadLossImpact';
import { getYearOptions } from '../lib/reportUtils';

export default function CAGRReport() {
  const { data: sales = [] } = useGetAllSales();
  const { data: expenses = [] } = useGetAllExpenses();
  const { data: deadPlants = [] } = useGetAllDeadPlants();
  
  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState((currentYear - 2).toString());
  const [endYear, setEndYear] = useState(currentYear.toString());
  
  const yearOptions = getYearOptions();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-nursery-primary">CAGR Report</h1>
          <p className="text-muted-foreground">Compound Annual Growth Rate Analysis</p>
        </div>
        <div className="flex gap-2">
          <Select value={startYear} onValueChange={setStartYear}>
            <SelectTrigger className="w-[120px]">
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
          <span className="flex items-center">to</span>
          <Select value={endYear} onValueChange={setEndYear}>
            <SelectTrigger className="w-[120px]">
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
      </div>

      <CAGRMetrics
        sales={sales}
        expenses={expenses}
        deadPlants={deadPlants}
        startYear={startYear}
        endYear={endYear}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-nursery-primary">Year-over-Year Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <YoYComparisonTable
              sales={sales}
              expenses={expenses}
              deadPlants={deadPlants}
              startYear={startYear}
              endYear={endYear}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-nursery-primary">Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <CAGRTrendChart
              sales={sales}
              expenses={expenses}
              deadPlants={deadPlants}
              startYear={startYear}
              endYear={endYear}
            />
          </CardContent>
        </Card>
      </div>

      <DeadLossImpact
        sales={sales}
        expenses={expenses}
        deadPlants={deadPlants}
        startYear={startYear}
        endYear={endYear}
      />
    </div>
  );
}
