import { useBudgetItems } from "@/hooks/use-budget-item";
import { formatCurrency } from "@/utils/functions/string";

export default function ResumeBudgetValue() {
    const {
        items,
        total
    } = useBudgetItems();

    return (
        <div className="col-span-12">
            <div className="w-full border rounded-md p-4 bg-muted/30">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Total de Itens</span>
                    <span>{items.length}</span>
                </div>

                <div className="flex justify-between mt-2 text-base font-semibold">
                    <span>Total Geral</span>
                    <span>{formatCurrency(total)}</span>
                </div>
            </div>
        </div>
    )
}