import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function MonthlyROIChart({ sales, expenses, products, deadPlants }: any) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={[]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="roi" stroke="oklch(0.55 0.15 145)" />
      </LineChart>
    </ResponsiveContainer>
  );
}
