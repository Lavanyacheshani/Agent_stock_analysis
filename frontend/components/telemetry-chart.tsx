"use client"

import { useTheme } from "next-themes"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TelemetryChartProps {
  data: any[]
  dataKey: string
  xAxisDataKey: string
  color: string
}

export default function TelemetryChart({ data, dataKey, xAxisDataKey, color }: TelemetryChartProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
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
          dataKey={xAxisDataKey}
          tick={{ fill: isDark ? "#94a3b8" : "#64748b" }}
          axisLine={{ stroke: isDark ? "#334155" : "#e2e8f0" }}
        />
        <YAxis tick={{ fill: isDark ? "#94a3b8" : "#64748b" }} axisLine={{ stroke: isDark ? "#334155" : "#e2e8f0" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1e293b" : "#ffffff",
            borderColor: isDark ? "#334155" : "#e2e8f0",
            color: isDark ? "#e2e8f0" : "#1e293b",
          }}
        />
        <Area type="monotone" dataKey={dataKey} stroke={color} fill={color} fillOpacity={0.2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

