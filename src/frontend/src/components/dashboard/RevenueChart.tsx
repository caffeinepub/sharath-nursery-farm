import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function RevenueChart({ sales }: any) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={[]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="oklch(0.55 0.15 145)" />
      </LineChart>
    </ResponsiveContainer>
  );
}
