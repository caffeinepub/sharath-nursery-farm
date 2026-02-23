import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function YoYGrowth({ currentYearSales, previousYearSales }: any) {
  const currentTotal = currentYearSales.reduce((sum: number, s: any) => sum + s.totalPaid, 0);
  const previousTotal = previousYearSales.reduce((sum: number, s: any) => sum + s.totalPaid, 0);
  const growth = previousTotal > 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;
  const isPositive = growth >= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Year-over-Year Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {isPositive ? <TrendingUp className="text-nursery-primary" /> : <TrendingDown className="text-destructive" />}
          <span className={`text-2xl font-bold ${isPositive ? 'text-nursery-primary' : 'text-destructive'}`}>
            {growth.toFixed(2)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
