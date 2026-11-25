import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ChartCardProps = {
    title: string;
    description?: string;
    empty?: boolean;
    className?: string;
    children: React.ReactNode;
};

export default function ChartCard({ title, description, empty, className, children }: ChartCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                {empty ? (
                    <div className="flex h-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                        Sem dados neste período
                    </div>
                ) : (
                    children
                )}
            </CardContent>
        </Card>
    );
}
