"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { riskByType, riskTrend } from "@/lib/data/demo";

const tooltipStyle = {
  background: "#1A1A22",
  border: "1px solid rgba(139,111,71,0.32)",
  borderRadius: 8,
  fontSize: 12,
  color: "#EDE8DF",
};

export function RiskTrendChart() {
  return (
    <div className="h-64 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={riskTrend}>
          <CartesianGrid stroke="rgba(139,111,71,0.16)" vertical={false} />
          <XAxis dataKey="day" stroke="#9C9488" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#9C9488" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey="protected"
            stroke="#C9A86A"
            fill="#C9A86A"
            fillOpacity={0.1}
            strokeWidth={1.75}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RiskTypeChart() {
  return (
    <div className="h-64 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={riskByType} layout="vertical" margin={{ left: 24 }}>
          <CartesianGrid stroke="rgba(139,111,71,0.16)" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="type"
            stroke="#9C9488"
            fontSize={12}
            width={130}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="value" fill="#C9A86A" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
