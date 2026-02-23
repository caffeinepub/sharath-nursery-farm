import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '../../lib/utils';

export function MetricsCards({ sales, expenses, deadPlants }: any) {
  const revenue = sales.reduce((sum: number, s: any) => sum + s.totalPaid, 0);
  const totalExpenses = expenses.reduce((sum: number, e: any) => sum + e.amount, 0);
  const deadLoss = deadPlants.reduce((sum: number, d: any) => sum + d.totalLoss, 0);
  const netProfit = revenue - totalExpenses - deadLoss;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader><CardTitle className="text-sm">Revenue</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold text-nursery-primary">{formatCurrency(revenue)}</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-sm">Expenses</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold text-nursery-secondary">{formatCurrency(totalExpenses)}</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-sm">Dead Loss</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold text-destructive">{formatCurrency(deadLoss)}</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-sm">Net Profit</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold text-nursery-accent">{formatCurrency(netProfit)}</p></CardContent>
      </Card>
    </div>
  );
}
