import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessInfoForm } from '../components/settings/BusinessInfoForm';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useGetAllSales, useGetAllExpenses, useGetAllDeadPlants, useGetAllCustomers, useGetAllWorkers } from '../hooks/useQueries';
import { toast } from 'sonner';

export default function Settings() {
  const { data: sales = [] } = useGetAllSales();
  const { data: expenses = [] } = useGetAllExpenses();
  const { data: deadPlants = [] } = useGetAllDeadPlants();
  const { data: customers = [] } = useGetAllCustomers();
  const { data: workers = [] } = useGetAllWorkers();

  const handleExport = () => {
    const data = { sales, expenses, deadPlants, customers, workers };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sharath-nursery-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-nursery-primary">Settings</h1>
        <p className="text-muted-foreground">Manage business information and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-nursery-primary">Business Information</CardTitle>
        </CardHeader>
        <CardContent>
          <BusinessInfoForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-nursery-primary">Data Backup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Export all your business data including sales, expenses, dead plants, customers, and workers as a JSON file.
          </p>
          <Button onClick={handleExport} className="bg-nursery-primary hover:bg-nursery-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
