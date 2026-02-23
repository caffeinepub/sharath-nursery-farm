import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllDeadPlants } from '../hooks/useQueries';
import { DeadPlantMetrics } from '../components/reports/DeadPlantMetrics';
import { LossByReasonChart } from '../components/reports/LossByReasonChart';
import { LossByCategoryChart } from '../components/reports/LossByCategoryChart';
import { MonthlyDeathTrend } from '../components/reports/MonthlyDeathTrend';
import { DeathRateTable } from '../components/reports/DeathRateTable';
import { SmartInsights } from '../components/reports/SmartInsights';
import { DeadPlantTips } from '../components/reports/DeadPlantTips';

export default function DeadPlantReport() {
  const { data: deadPlants = [] } = useGetAllDeadPlants();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-nursery-secondary">Dead Plant Loss Report</h1>
        <p className="text-muted-foreground">Comprehensive loss analysis and insights</p>
      </div>

      <DeadPlantMetrics deadPlants={deadPlants} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-nursery-secondary">Loss by Reason</CardTitle>
          </CardHeader>
          <CardContent>
            <LossByReasonChart deadPlants={deadPlants} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-nursery-secondary">Loss by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <LossByCategoryChart deadPlants={deadPlants} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-nursery-secondary">Monthly Death Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyDeathTrend deadPlants={deadPlants} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-nursery-secondary">Death Rate by Product</CardTitle>
        </CardHeader>
        <CardContent>
          <DeathRateTable deadPlants={deadPlants} />
        </CardContent>
      </Card>

      <SmartInsights deadPlants={deadPlants} />

      <DeadPlantTips deadPlants={deadPlants} />
    </div>
  );
}
