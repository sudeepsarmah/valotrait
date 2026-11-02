"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TraitChart({ data }) {
  const chartData = Object.entries(data.scores).map(([trait, score]) => {
    return { subject: trait, score: score };
  });

  console.log(chartData);

  return (
    <div className="h-[320px] w-full min-w-0 sm:h-[380px] md:h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          outerRadius="65%"
          data={chartData}
          margin={{
            top: 15,
            left: 15,
            right: 15,
            bottom: 15,
          }}
        >
          <PolarGrid stroke="#263341" />

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
            }}
          />

          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#A5ADB7", fontSize: 11 }}
          />

          <PolarRadiusAxis
            tick={{ fill: "#A5ADB7", fontSize: 10 }}
            axisLine={false}
          />

          <Radar
            dataKey="score"
            name="Trait Scores"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
