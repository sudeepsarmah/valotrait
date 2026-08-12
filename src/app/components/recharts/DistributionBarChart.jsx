"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function DistributionBarChart() {
    const data = [
        {
            name: 'AEDS',
            distribution: 14,
        },
        {
            name: 'AEDC',
            distribution: 12,
        },
        {
            name: 'AERC',
            distribution: 25,
        },
        {
            name: 'BERS',
            distribution: 22,
        },
        {
            name: 'ASDC',
            distribution: 32,
        },
        {
            name: 'AERS',
            distribution: 44,
        },
        {
            name: 'BSDC',
            distribution: 11,
        },
        {
            name: 'BSDS',
            distribution: 5,
        },
        {
            name: 'BEDS',
            distribution: 19,
        },
        {
            name: 'BSRS',
            distribution: 4,
        },
        {
            name: 'BEDC',
            distribution: 6,
        },
        {
            name: 'ASDS',
            distribution: 14,
        },
        {
            name: 'BERC',
            distribution: 17,
            amt: 2100,
        },
        {
            name: 'ASRC',
            distribution: 19,
        },
        {
            name: 'ASRS',
            distribution: 22,
        },
        {
            name: 'BSRC',
            distribution: 21,
        }
    ];
    return (
        <>
            <BarChart
                style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
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
                <Bar dataKey="distribution" name="Personality Distribution Graph" fill="#cf0c2a" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
                {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]} /> */}
            </BarChart>
        </>
    )
}