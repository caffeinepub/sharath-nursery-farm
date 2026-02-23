import { Button } from '@/components/ui/button';

export function DeadPlantForm() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Record dead or damaged plants</p>
      <Button className="bg-nursery-secondary">Submit</Button>
    </div>
  );
}
