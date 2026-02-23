import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllExpenses } from '../hooks/useQueries';
import { ExpenseForm } from '../components/expenses/ExpenseForm';
import { ExpenseTable } from '../components/expenses/ExpenseTable';
import { MonthlySummary } from '../components/expenses/MonthlySummary';

export default function Expenses() {
  const { data: expenses = [], isLoading } = useGetAllExpenses();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-nursery-secondary">Expenses Management</h1>
        <p className="text-muted-foreground">Track and manage business expenses</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-nursery-secondary">Add New Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-nursery-secondary">Expense History</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseTable expenses={expenses} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>

        <div>
          <MonthlySummary expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
