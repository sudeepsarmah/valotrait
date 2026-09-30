"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function DistributionBarChart({ data }) {
  return (
    <>
      <BarChart
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="distribution"
          name="Personality Distribution Graph"
          fill="#cf0c2a"
          activeBar={{ fill: "pink", stroke: "blue" }}
          radius={[10, 10, 0, 0]}
        />
        {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]} /> */}
      </BarChart>
    </>
  );
}
