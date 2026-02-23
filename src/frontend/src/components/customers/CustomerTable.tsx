export function CustomerTable({ customers, onSelectCustomer, isLoading }: any) {
  if (isLoading) return <div>Loading...</div>;
  return <div className="text-center py-4">No customers found</div>;
}
