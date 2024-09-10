'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
    BarChart,
    LineChart,
    PieChart,
    CandlestickChart as CandlestickIcon,
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import CandlestickChart from '@/components/candlestick-chart';
import LineChartComponent from '@/components/line-chart';
import BarChartComponent from '@/components/bar-chart';
import PieChartComponent from '@/components/pie-chart';
import { ChartCard } from '@/components/chart-card';

interface ChartData {
    candlestick: any;
    line: any;
    bar: any;
    pie: any;
}

export default function Dashboard() {
    const [chartData, setChartData] = useState<ChartData>({
        candlestick: null,
        line: null,
        bar: null,
        pie: null,
    });
    const [loading, setLoading] = useState(true);

    const fetchChartData = async (endpoint: string) => {
        try {
            const response = await axios.get(`/api/${endpoint}`);
            return response.data;
        } catch (error) {
            if (error.response) {
                if (
                    error.response.status >= 400 &&
                    error.response.status < 500
                ) {
                    toast.error(
                        `Client Error: ${error.response.status} - ${
                            error.response.data.detail || 'Something went wrong'
                        }`
                    );
                } else if (error.response.status >= 500) {
                    toast.error(
                        `Server Error: ${error.response.status} - Please try again later.`
                    );
                }
            } else if (error.request) {
                toast.error(
                    'No response from the server. Please check your network.'
                );
            } else {
                toast.error(`Error: ${error.message}`);
            }
            throw new Error(`Failed to fetch ${endpoint} data`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const results = await Promise.allSettled([
                fetchChartData('candlestick-chart'),
                fetchChartData('line-chart'),
                fetchChartData('bar-chart'),
                fetchChartData('pie-chart'),
            ]);
            const newChartData: Partial<ChartData> = {};
            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    switch (index) {
                        case 0:
                            newChartData.candlestick = result.value;
                            break;
                        case 1:
                            newChartData.line = result.value;
                            break;
                        case 2:
                            newChartData.bar = result.value;
                            break;
                        case 3:
                            newChartData.pie = result.value;
                            break;
                        default:
                            break;
                    }
                } else {
                    toast.error(result.reason.message);
                }
            });
            setChartData((prevState) => ({
                ...prevState,
                ...newChartData,
            }));
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-200 pt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col gap-10">
                    {loading ? (
                        <>
                            {[...Array(4)].map((_, index) => (
                                <Card
                                    key={index}
                                    className="shadow-lg rounded-lg border border-gray-200 bg-white"
                                >
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold text-gray-700">
                                            Loading...
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-4">
                                        <Skeleton className="w-full h-[100px]" />
                                        <Skeleton className="w-full h-[120px]" />
                                        <Skeleton className="w-full h-[220px]" />
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    ) : (
                        <>
                            <ChartCard title="Candlestick Chart">
                                <CandlestickChart
                                    data={chartData.candlestick}
                                />
                            </ChartCard>
                            <ChartCard title="Line Chart">
                                <LineChartComponent data={chartData.line} />
                            </ChartCard>
                            <ChartCard title="Bar Chart">
                                <BarChartComponent data={chartData.bar} />
                            </ChartCard>
                            <ChartCard title="Pie Chart">
                                <PieChartComponent data={chartData.pie} />
                            </ChartCard>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
