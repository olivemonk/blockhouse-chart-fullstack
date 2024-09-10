import React, { useEffect, useRef } from 'react';
import {
    createChart,
    ColorType,
    IChartApi,
    ISeriesApi,
    CandlestickData,
    Time,
    TimeFormatter,
} from 'lightweight-charts';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from './ui/skeleton';

interface CandlestickChartProps {
    data: {
        data: CandlestickData[];
    } | null;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

    useEffect(() => {
        if (chartContainerRef.current && data) {
            const handleResize = () => {
                chartRef.current?.applyOptions({
                    width: chartContainerRef.current?.clientWidth,
                });
            };

            const timeFormatter: TimeFormatter = (time: Time) => {
                const date = new Date(time * 1000);
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                });
            };

            chartRef.current = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 300,
                layout: {
                    background: { type: ColorType.Solid, color: 'transparent' },
                    textColor: 'black',
                },
                grid: {
                    vertLines: { color: 'rgba(197, 203, 206, 0.5)' },
                    horzLines: { color: 'rgba(197, 203, 206, 0.5)' },
                },
                timeScale: {
                    timeVisible: true,
                    secondsVisible: false,
                    tickMarkFormatter: timeFormatter,
                },
                autoSize: true,
            });

            seriesRef.current = chartRef.current.addCandlestickSeries({
                upColor: '#22c55e',
                downColor: '#ef4444',
                borderVisible: false,
                wickUpColor: '#22c55e',
                wickDownColor: '#ef4444',
            });
            const formattedData: CandlestickData[] = data.data.data.map(
                (item) => ({
                    time: new Date(item.x).getTime() / 1000, 
                    open: item.open,
                    high: item.high,
                    low: item.low,
                    close: item.close,
                })
            );
            seriesRef.current.setData(formattedData);

            const timeScale = chartRef.current.timeScale();
            timeScale.setVisibleLogicalRange({
                from: formattedData.length - 30,
                to: formattedData.length - 1,
            });
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
                chartRef.current?.remove();
            };
        }
    }, [data]);

    if (!data) {
        return (
            <Card className="w-full h-[400px]">
                <CardContent className="flex items-center justify-center h-full">
                    <Skeleton className='w-2/3 h-10' />
                    <Skeleton className='w-full h-10' />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full h-[400px]">
            <CardContent>
                <div ref={chartContainerRef} className="w-full h-[325px]" />
            </CardContent>
        </Card>
    );
};

export default CandlestickChart;
