'use client';

import React from 'react';
import { PieChart, Pie, Cell, LabelList } from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

interface PieChartData {
    labels: string[];
    datasets: [
        {
            data: number[];
            backgroundColor: string[];
        }
    ];
}

interface PieChartProps {
    data: PieChartData | null;
}

const PieChartComponent = ({ data }: { data: PieChartProps }) => {
    if (!data.data || !data.data.datasets || data.data.labels.length === 0) {
        return (
            <Card className="w-full h-[400px]">
                <CardContent className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Loading...</p>
                </CardContent>
            </Card>
        );
    }

    const dataset = data.data.datasets[0]; // Access the first dataset

    // Transform the data into the format required by Recharts
    const transformedData = data.data.labels.map(
        (label: string, index: number) => ({
            browser: label, // Using 'browser' as key for consistency (could be 'category')
            visitors: dataset.data[index], // This is the value for each pie segment
            fill: dataset.backgroundColor[index], // This is the color for each pie segment
        })
    );

    // Define chart configuration based on data
    const chartConfig = data.data.labels.reduce((acc, label, index) => {
        acc[label] = {
            label: label,
            color: dataset.backgroundColor[index],
        };
        return acc;
    }, {} as Record<string, { label: string; color: string }>);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Label List</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    nameKey="browser"
                                    hideLabel
                                />
                            }
                        />
                        <Pie data={transformedData} dataKey="visitors">
                            {transformedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            {/* <LabelList
                                dataKey="browser"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value: keyof typeof chartConfig) =>
                                    chartConfig[value]?.label
                                }
                            /> */}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default PieChartComponent;
