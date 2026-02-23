import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export function SmartInsights({ deadPlants }: any) {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Smart Insights</AlertTitle>
      <AlertDescription>Monitor your plant health closely</AlertDescription>
    </Alert>
  );
}
