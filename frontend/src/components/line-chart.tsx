import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Card, CardContent} from '@/components/ui/card';

interface LineChartProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
        }[];
    } | null;
}

const LineChartComponent = ({ data }: { data: LineChartProps }) => {
    if (!data)
        return (
            <div>
                <Card className="w-full h-[400px]">
                    <CardContent className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Loading...</p>
                    </CardContent>
                </Card>
            </div>
        );

    const chartData = data?.data?.labels.map((label, index) => {
        const item: any = { name: label };
        data?.data?.datasets?.forEach((dataset) => {
            item[dataset.label] = dataset.data[index];
        });
        return item;
    });

    const colors = ['#149840', '#83101a', '#ffc658', '#ff7300'];

    return (
        <ResponsiveContainer width="100%" height={375}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {data?.data?.datasets.map((dataset, index) => (
                    <Line
                        key={dataset.label}
                        type="monotone"
                        dataKey={dataset.label}
                        stroke={colors[index % colors.length]}
                        activeDot={{ r: 8 }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;
