import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DeadLossImpact({ sales, expenses, deadPlants, startYear, endYear }: any) {
  return (
    <Card>
      <CardHeader><CardTitle>Dead Loss Impact on CAGR</CardTitle></CardHeader>
      <CardContent><p>Impact analysis</p></CardContent>
    </Card>
  );
}
