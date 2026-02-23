export function WorkerTable({ workers, isLoading }: any) {
  if (isLoading) return <div>Loading...</div>;
  return <div className="text-center py-4">No workers found</div>;
}
