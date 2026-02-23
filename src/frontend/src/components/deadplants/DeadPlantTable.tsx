export function DeadPlantTable({ deadPlants, isLoading }: any) {
  if (isLoading) return <div>Loading...</div>;
  return <div className="text-center py-4">No dead plant records</div>;
}
