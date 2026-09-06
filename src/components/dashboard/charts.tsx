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
  background: "#0C0C0C",
  border: "1px solid rgba(176,137,58,0.28)",
  borderRadius: 8,
  fontSize: 12,
  color: "#C9C2B4",
};

export function RiskTrendChart({
  data = riskTrend,
}: {
  data?: { day: string; protected: number; alerts?: number }[];
}) {
  return (
    <div className="h-64 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid stroke="rgba(176,137,58,0.12)" vertical={false} />
          <XAxis dataKey="day" stroke="#A39470" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#A39470" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey="protected"
            stroke="#B0893A"
            fill="#B0893A"
            fillOpacity={0.18}
            strokeWidth={1.75}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RiskTypeChart({ data = riskByType }: { data?: { type: string; value: number }[] }) {
  const rows = data.length ? data : [{ type: "No flags yet", value: 0 }];
  return (
    <div className="h-64 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} layout="vertical" margin={{ left: 24 }}>
          <CartesianGrid stroke="rgba(176,137,58,0.12)" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="type"
            stroke="#A39470"
            fontSize={12}
            width={130}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="value" fill="#B0893A" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
