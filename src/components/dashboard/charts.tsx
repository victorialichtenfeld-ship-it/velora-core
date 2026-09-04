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
  background: "#F7F2E8",
  border: "1px solid rgba(28,34,48,0.12)",
  borderRadius: 12,
  fontSize: 12,
  color: "#1C2230",
};

export function RiskTrendChart() {
  return (
    <div className="h-64 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={riskTrend}>
          <defs>
            <linearGradient id="protected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9B7A3A" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#9B7A3A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(28,34,48,0.08)" vertical={false} />
          <XAxis dataKey="day" stroke="#5C6370" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#5C6370" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey="protected"
            stroke="#9B7A3A"
            fill="url(#protected)"
            strokeWidth={2}
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
          <CartesianGrid stroke="rgba(28,34,48,0.08)" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="type"
            stroke="#5C6370"
            fontSize={12}
            width={130}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="value" fill="#2F827A" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
