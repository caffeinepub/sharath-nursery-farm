export function ExpenseTable({ expenses, isLoading }: any) {
  if (isLoading) return <div>Loading...</div>;
  return <div className="text-center py-4">No expenses found</div>;
}
