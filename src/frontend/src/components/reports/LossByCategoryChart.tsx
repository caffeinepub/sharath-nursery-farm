import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function LossByCategoryChart({ deadPlants }: any) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={[]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="loss" fill="oklch(0.45 0.10 30)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
