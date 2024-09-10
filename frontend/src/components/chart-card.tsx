import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const ChartCard = ({
    title,
    icon,
    children,
}: {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}) => (
    <Card className="shadow-lg rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold text-gray-800 mb-6">
                {title}
            </CardTitle>
            <Badge variant="outline" className="text-sm font-medium">
                {icon}
            </Badge>
        </CardHeader>
        <CardContent>{children}</CardContent>
    </Card>
);