import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllDeadPlants } from '../hooks/useQueries';
import { DeadPlantForm } from '../components/deadplants/DeadPlantForm';
import { DeadPlantTable } from '../components/deadplants/DeadPlantTable';

export default function DeadPlants() {
  const { data: deadPlants = [], isLoading } = useGetAllDeadPlants();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-nursery-secondary">Dead Plant Management</h1>
        <p className="text-muted-foreground">Record and track plant losses</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-nursery-secondary">Record Dead/Damaged Plant</CardTitle>
        </CardHeader>
        <CardContent>
          <DeadPlantForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-nursery-secondary">Dead Plant History</CardTitle>
        </CardHeader>
        <CardContent>
          <DeadPlantTable deadPlants={deadPlants} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
