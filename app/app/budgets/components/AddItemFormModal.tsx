import FormModal from "@/components/form/FormModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BudgetItemForm } from "@/hooks/use-budget-item";
import { formatCurrency } from "@/utils/functions/string";
import { Dispatch, SetStateAction } from "react";

type Props = {
    itemForm: BudgetItemForm,
    setItemForm: Dispatch<SetStateAction<BudgetItemForm>>;
    handleAddItem: () => void,
    handleItemChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

export default function AddItemFormModal({ itemForm, setItemForm, handleItemChange, handleAddItem }: Props) {
    return (
        <FormModal title="Adicionar Item" pending={false}>
            <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-12 lg:col-span-12">
                    <Label>Nome</Label>
                    <Input
                        name="name"
                        value={itemForm.name}
                        onChange={handleItemChange}
                    />
                </div>

                <div className="col-span-6 lg:col-span-4">
                    <Label>Qtd</Label>
                    <Input
                        name="quantity"
                        type="number"
                        min={1}
                        value={itemForm.quantity}
                        onChange={handleItemChange}
                    />
                </div>

                <div className="col-span-6 lg:col-span-8">
                    <Label>Valor Unitário (R$)</Label>
                    <Input
                        name="value"
                        inputMode="numeric"
                        value={itemForm.value}
                        onChange={(e) => {
                            const rawValue = e.target.value
                            setItemForm(prev => ({
                                ...prev,
                                value: formatCurrency(rawValue),
                            }))
                        }}
                    />

                </div>

                <div className="col-span-12">
                    <Textarea
                        name="description"
                        placeholder="Descrição do item (opcional)"
                        value={itemForm.description}
                        onChange={handleItemChange}
                    />
                </div>

                <div className="col-span-12 flex justify-end items-center">
                    <Button onClick={handleAddItem}>
                        Adicionar Item
                    </Button>
                </div>
            </div>
        </FormModal>
    )
}