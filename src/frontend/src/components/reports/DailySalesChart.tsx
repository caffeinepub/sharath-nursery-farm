import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function DailySalesChart({ sales, month }: any) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={[]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="oklch(0.55 0.15 145)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
