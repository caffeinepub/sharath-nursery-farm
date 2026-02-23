import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function CAGRTrendChart({ sales, expenses, deadPlants, startYear, endYear }: any) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={[]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="cagr" stroke="oklch(0.55 0.15 145)" />
      </LineChart>
    </ResponsiveContainer>
  );
}
