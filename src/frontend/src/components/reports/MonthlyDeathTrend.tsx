import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function MonthlyDeathTrend({ deadPlants }: any) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={[]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="oklch(0.45 0.10 30)" />
      </LineChart>
    </ResponsiveContainer>
  );
}
