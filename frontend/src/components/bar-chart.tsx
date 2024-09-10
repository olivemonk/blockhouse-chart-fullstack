"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type BarChartDataProps = {
  data: {
    labels: string[];
    datasets: { label: string; data: number[] }[];
  } | null; // Add null as a valid type for data to account for loading states
};

export const description = "A multiple bar chart";

// Example configuration with colors for the bars
const chartConfig = {
  "Units Sold": {
    label: "Units Sold",
    color: "#2563eb",
  },
  "Revenue ($)": {
    label: "Revenue ($)",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const BarChartComponent = ({ data } : {data:BarChartDataProps}) => {
  console.log(data);
  
  if (!data || !data.data?.labels || data.data.labels.length === 0) {
    return (
      <Card className="w-full h-[400px]">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.data.labels.map((label, index) => {
    const formattedData: {month: string}= { month: label }; 
    data.data?.datasets.forEach((dataset) => {
      formattedData[dataset.label] = dataset.data[index];
    });
    return formattedData;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales and Revenue</CardTitle>
        <CardDescription>Laptop to Headphones</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="Units Sold"
              fill="var(--chart-1)" 
              radius={4}
            />
            <Bar
              dataKey="Revenue ($)"
              fill="var(--chart-2)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
