"use client"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';

export default function TraitChart({ data }) {
    const chartData = Object.entries(data.scores).map(([trait, score]) => {
        return { subject: trait, score: score }
    })
    console.log(chartData)
    return (
        <>
            <h1>This is the chart</h1>
            <RadarChart
                style={{ width: '100%', height: '100%', maxWidth: '600px', maxHeight: '80vh', aspectRatio: 1 }}
                responsive
                outerRadius="80%"
                data={chartData}
                margin={{
                    top: 20,
                    left: 20,
                    right: 20,
                    bottom: 20,
                }}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                {/* <RechartsDevtools /> */}
            </RadarChart>

        </>
    )
}