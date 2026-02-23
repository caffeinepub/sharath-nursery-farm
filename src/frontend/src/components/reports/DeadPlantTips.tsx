import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DeadPlantTips({ deadPlants }: any) {
  return (
    <Card>
      <CardHeader><CardTitle>Tips to Reduce Plant Loss</CardTitle></CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          <li>Maintain proper watering schedule</li>
          <li>Monitor for pests regularly</li>
          <li>Ensure adequate drainage</li>
        </ul>
      </CardContent>
    </Card>
  );
}
