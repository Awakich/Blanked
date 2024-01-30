"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { FC } from 'react'

type OverviewProps = {
    totalImages: number | string
    totalNotes: number | string
    totalTasks: number | string
    totalCompleteTasks: number | string
    totalPictures: number | string
}

const Overview: FC<OverviewProps> = ({ totalImages, totalNotes, totalTasks, totalCompleteTasks, totalPictures }) => {

    const OverviewData = [
        {
            name: "Images",
            total: totalImages,
        },
        {
            name: "Tasks",
            total: totalTasks,
        },
        {
            name: "Complete Tasks",
            total: totalCompleteTasks,
        },
        {
            name: "Notes",
            total: totalNotes
        },
        {
            name: "Pictures",
            total: totalPictures
        }
    ]

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={OverviewData}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />

                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`
                    }
                />

                < Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default Overview