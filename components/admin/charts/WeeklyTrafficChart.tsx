"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Dummy data for weekly traffic
const data = [
  { name: 'Mon', visits: 1200 },
  { name: 'Tue', visits: 1400 },
  { name: 'Wed', visits: 1600 },
  { name: 'Thu', visits: 1400 },
  { name: 'Fri', visits: 1800 },
  { name: 'Sat', visits: 1000 },
  { name: 'Sun', visits: 800 },
];

export default function WeeklyTrafficChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} />
        <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Bar
          dataKey="visits"
          fill="#1d42d9"
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}