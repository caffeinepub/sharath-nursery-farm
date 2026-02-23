import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function InvestmentBreakdown({ expenses, products, deadPlants }: any) {
  return (
    <Card>
      <CardHeader><CardTitle>Investment Breakdown</CardTitle></CardHeader>
      <CardContent><p>Investment analysis</p></CardContent>
    </Card>
  );
}
