"use client"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend } from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';

export default function TraitChart({ data }) {
    const chartData = Object.entries(data.scores).map(([trait, score]) => {
        return { subject: trait, score: score }
    })
    console.log(chartData)
    return (
        <>

            <RadarChart
                style={{ width: '100%', height: '100%', maxWidth: '600px', maxHeight: '80vh', aspectRatio: 1 }}
                responsive
                outerRadius="60%"
                data={chartData}
                margin={{
                    top: 5,
                    left: 10,
                    right: 15,
                    bottom: 5,
                }}
            >
                <PolarGrid />
                <Tooltip />
                <Legend />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />

                <Radar dataKey="score" name='Trait Scores' stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                {/* <RechartsDevtools /> */}
            </RadarChart>

        </>
    )
}