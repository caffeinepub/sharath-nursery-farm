import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function YearComparisonChart({ sales, expenses, deadPlants, year }: any) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={[]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="oklch(0.55 0.15 145)" />
        <Line type="monotone" dataKey="profit" stroke="oklch(0.75 0.12 85)" />
      </LineChart>
    </ResponsiveContainer>
  );
}
