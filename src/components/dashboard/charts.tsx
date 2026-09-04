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
  background: "#151515",
  border: "1px solid rgba(226,194,120,0.16)",
  borderRadius: 8,
  fontSize: 12,
  color: "#F7F3EA",
};

export function RiskTrendChart() {
  return (
    <div className="h-64 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={riskTrend}>
          <defs>
            <linearGradient id="protected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E2C278" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#E2C278" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(244,239,230,0.08)" vertical={false} />
          <XAxis dataKey="day" stroke="#9C968C" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#9C968C" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey="protected"
            stroke="#E2C278"
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
          <CartesianGrid stroke="rgba(244,239,230,0.08)" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="type"
            stroke="#9C968C"
            fontSize={12}
            width={130}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="value" fill="#E2C278" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
