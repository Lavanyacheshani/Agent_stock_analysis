"use client"

import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface StockChartProps {
  data: Array<{
    date: string
    price: number
  }>
}

export default function StockChart({ data }: StockChartProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Calculate moving averages
  const ma50 = calculateMovingAverage(data, 5) // Using 5 instead of 50 for demo data

  // Calculate min and max for y-axis domain
  const prices = data.map((item) => item.price)
  const minPrice = Math.min(...prices) * 0.995
  const maxPrice = Math.max(...prices) * 1.005

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} />
        <XAxis
          dataKey="date"
          tick={{ fill: isDark ? "#94a3b8" : "#64748b" }}
          axisLine={{ stroke: isDark ? "#334155" : "#e2e8f0" }}
        />
        <YAxis
          domain={[minPrice, maxPrice]}
          tick={{ fill: isDark ? "#94a3b8" : "#64748b" }}
          axisLine={{ stroke: isDark ? "#334155" : "#e2e8f0" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1e293b" : "#ffffff",
            borderColor: isDark ? "#334155" : "#e2e8f0",
            color: isDark ? "#e2e8f0" : "#1e293b",
          }}
        />
        <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
        <Line
          type="monotone"
          data={ma50}
          dataKey="value"
          stroke="#10b981"
          strokeWidth={1.5}
          dot={false}
          strokeDasharray="3 3"
        />
        <ReferenceLine y={data[data.length - 1].price} stroke={isDark ? "#94a3b8" : "#64748b"} strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  )
}

// Helper function to calculate moving average
function calculateMovingAverage(data: any[], period: number) {
  const result = []

  for (let i = 0; i < data.length; i++) {
    if (i >= period - 1) {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, item) => acc + item.price, 0)

      result.push({
        date: data[i].date,
        value: sum / period,
      })
    } else {
      result.push({
        date: data[i].date,
        value: null,
      })
    }
  }

  return result
}

