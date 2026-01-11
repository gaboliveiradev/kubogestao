import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon, HugeiconsIconProps } from "@hugeicons/react";

export type Props = { 
    Icon: HugeiconsIconProps["icon"], 
    title: string, 
    data: string
};

export const CardStats = ({ Icon, title, data }: Props) => {
    return (
        <Card className="py-0">
            <CardContent className="p-4! flex justify-between items-center">
                <div>
                    <h2>{title}</h2>
                    <p className="text-2xl sm-text-lg font-bold">{data}</p>
                </div>
                <div>
                    <HugeiconsIcon icon={Icon} className='bg-primary text-white rounded-full ml-auto w-12 h-12 p-2' />
                </div>
            </CardContent>
        </Card>
    )
}