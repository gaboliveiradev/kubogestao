import { formatCurrency } from "@/utils/functions/string";

export default function ResumeBudgetValue({ total }: { total?: number }) {
    return (
        <div className="col-span-12">
            <div className="w-full border rounded-md p-2 bg-muted/30">
                <div className="flex justify-between text-base font-semibold">
                    <span>Total Geral</span>
                    <span className="font-extrabold">{formatCurrency(total || 0)}</span>
                </div>
            </div>
        </div>
    )
}