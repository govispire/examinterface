'use client';

import { useTheme } from 'next-themes';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

interface ChartProps {
  data: number[];
  labels: string[];
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

export function BarChart({ data, labels }: ChartProps) {
  const { theme } = useTheme();
  const chartData = labels.map((label, index) => ({
    name: label,
    value: data[index],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fill: theme === 'dark' ? '#fff' : '#000' }}
        />
        <YAxis
          tick={{ fill: theme === 'dark' ? '#fff' : '#000' }}
        />
        <Tooltip />
        <Bar dataKey="value" fill="hsl(var(--chart-1))" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

export function LineChart({ data, labels }: ChartProps) {
  const { theme } = useTheme();
  const chartData = labels.map((label, index) => ({
    name: label,
    value: data[index],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fill: theme === 'dark' ? '#fff' : '#000' }}
        />
        <YAxis
          tick={{ fill: theme === 'dark' ? '#fff' : '#000' }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--chart-2))" }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export function PieChart({ data, labels }: ChartProps) {
  const chartData = labels.map((label, index) => ({
    name: label,
    value: data[index],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}