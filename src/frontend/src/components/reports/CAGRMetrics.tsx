import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CAGRMetrics({ sales, expenses, deadPlants, startYear, endYear }: any) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Revenue CAGR</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold">0%</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Profit CAGR</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold">0%</p></CardContent>
      </Card>
    </div>
  );
}
