"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Dummy data for daily visitors
const data = [
  { name: '00:00', visitors: 120 },
  { name: '03:00', visitors: 80 },
  { name: '06:00', visitors: 60 },
  { name: '09:00', visitors: 180 },
  { name: '12:00', visitors: 250 },
  { name: '15:00', visitors: 230 },
  { name: '18:00', visitors: 190 },
  { name: '21:00', visitors: 150 },
];

export default function VisitorChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1d42d9" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#1d42d9" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
        <Area
          type="monotone"
          dataKey="visitors"
          stroke="#1d42d9"
          fillOpacity={1}
          fill="url(#visitorGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}