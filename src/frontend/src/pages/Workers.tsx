import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllWorkers } from '../hooks/useQueries';
import { WorkerForm } from '../components/workers/WorkerForm';
import { PaymentForm } from '../components/workers/PaymentForm';
import { WorkerTable } from '../components/workers/WorkerTable';

export default function Workers() {
  const { data: workers = [], isLoading } = useGetAllWorkers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-nursery-secondary">Worker Management</h1>
        <p className="text-muted-foreground">Manage workers and salary payments</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-nursery-secondary">Add New Worker</CardTitle>
          </CardHeader>
          <CardContent>
            <WorkerForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-nursery-secondary">Record Salary Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentForm workers={workers} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-nursery-secondary">Workers List</CardTitle>
        </CardHeader>
        <CardContent>
          <WorkerTable workers={workers} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
