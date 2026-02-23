import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ROIComparison({ sales, expenses, products, deadPlants }: any) {
  return (
    <Card>
      <CardHeader><CardTitle>ROI Comparison</CardTitle></CardHeader>
      <CardContent><p>ROI analysis</p></CardContent>
    </Card>
  );
}
