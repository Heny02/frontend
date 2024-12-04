"use client"

import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

interface DonutChartProps {
  data: Array<{ role: string }>
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const roleCount = data.reduce((acc, item) => {
    acc[item.role] = (acc[item.role] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(roleCount).map(([name, value]) => ({ name, value }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default DonutChart

