import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllSales, useGetAllExpenses, useGetAllDeadPlants, useGetAllPlants, useGetAllPots, useGetAllPropagationPlants } from '../hooks/useQueries';
import { InvestmentBreakdown } from '../components/reports/InvestmentBreakdown';
import { ROIComparison } from '../components/reports/ROIComparison';
import { MonthlyROIChart } from '../components/reports/MonthlyROIChart';

export default function ROIReport() {
  const { data: sales = [] } = useGetAllSales();
  const { data: expenses = [] } = useGetAllExpenses();
  const { data: deadPlants = [] } = useGetAllDeadPlants();
  const { data: plants = [] } = useGetAllPlants();
  const { data: pots = [] } = useGetAllPots();
  const { data: propagation = [] } = useGetAllPropagationPlants();

  const allProducts = [...plants, ...pots, ...propagation];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-nursery-primary">ROI Report</h1>
        <p className="text-muted-foreground">Return on Investment Analysis</p>
      </div>

      <InvestmentBreakdown
        expenses={expenses}
        products={allProducts}
        deadPlants={deadPlants}
      />

      <ROIComparison
        sales={sales}
        expenses={expenses}
        products={allProducts}
        deadPlants={deadPlants}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-nursery-primary">Monthly ROI Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyROIChart
            sales={sales}
            expenses={expenses}
            products={allProducts}
            deadPlants={deadPlants}
          />
        </CardContent>
      </Card>
    </div>
  );
}
