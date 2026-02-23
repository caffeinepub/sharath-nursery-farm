export function PropagationTable({ plants, onEdit, isLoading }: any) {
  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  return <div className="text-center py-8">No propagation plants found</div>;
}
