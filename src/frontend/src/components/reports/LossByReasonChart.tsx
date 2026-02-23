import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function LossByReasonChart({ deadPlants }: any) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={[]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
          <Cell fill="oklch(0.55 0.15 145)" />
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
