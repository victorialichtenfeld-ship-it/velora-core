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
  background: "#121623",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  fontSize: 12,
};

export function RiskTrendChart() {
  return (
    <div className="h-64 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={riskTrend}>
          <defs>
            <linearGradient id="protected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9B07A" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#C9B07A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="day" stroke="#8b93a7" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#8b93a7" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey="protected"
            stroke="#C9B07A"
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
          <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="type"
            stroke="#8b93a7"
            fontSize={12}
            width={130}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="value" fill="#6EC8B8" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
