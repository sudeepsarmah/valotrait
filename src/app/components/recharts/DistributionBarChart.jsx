"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DistributionBarChart({ data }) {
  return (
    <div className="h-[320px] w-full min-w-0 sm:h-[380px] md:h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -15,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#263341"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            tick={{ fill: "#A5ADB7", fontSize: 11 }}
            axisLine={{ stroke: "#263341" }}
            tickLine={false}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={65}
          />

          <YAxis
            allowDecimals={false}
            width={35}
            tick={{ fill: "#A5ADB7", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0F1923",
              border: "1px solid #263341",
              borderRadius: "10px",
              color: "#ECE8E1",
              fontSize: "12px",
            }}
          />

          <Legend
            wrapperStyle={{
              fontSize: "12px",
              color: "#A5ADB7",
              paddingTop: "12px",
            }}
          />

          <Bar
            dataKey="distribution"
            name="Personality Distribution Graph"
            fill="#cf0c2a"
            activeBar={{ fill: "pink", stroke: "blue" }}
            radius={[8, 8, 0, 0]}
            maxBarSize={55}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
