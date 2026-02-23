import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DeadPlantMetrics({ deadPlants }: any) {
  const totalCount = deadPlants.reduce((sum: number, d: any) => sum + Number(d.deadQuantity), 0);
  const totalLoss = deadPlants.reduce((sum: number, d: any) => sum + d.totalLoss, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Total Dead Count</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold text-destructive">{totalCount}</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Total Loss</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold text-destructive">₹{totalLoss.toFixed(2)}</p></CardContent>
      </Card>
    </div>
  );
}
