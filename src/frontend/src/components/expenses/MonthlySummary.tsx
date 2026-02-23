import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MonthlySummary({ expenses }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">₹0</p>
      </CardContent>
    </Card>
  );
}
