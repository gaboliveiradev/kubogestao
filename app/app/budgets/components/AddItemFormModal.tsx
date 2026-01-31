import FormModal from "@/components/form/FormModal";
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BudgetItemForm } from "@/hooks/use-budget-item";
import { formatCurrency } from "@/utils/functions/string";
import { Add01Icon, MinusSignIcon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

type Props = {
    handleAddItem: (itemForm: BudgetItemForm) => void,
}

export default function AddItemFormModal({ handleAddItem }: Props) {
    const [itemForm, setItemForm] = useState<BudgetItemForm>({
        name: "",
        quantity: 1,
        value: "",
        description: "",
    });

    function handleItemChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setItemForm(prev => ({ ...prev, [name]: value }));
    }

    function handleChangeObservation(html: string) {
        setItemForm(prev => ({
            ...prev,
            description: html,
        }));
    }

    function decreaseQuantity() {
        setItemForm(prev => ({
            ...prev,
            quantity: Math.max(1, prev.quantity - 1),
        }));
    }

    function increaseQuantity() {
        setItemForm(prev => ({
            ...prev,
            quantity: prev.quantity + 1,
        }));
    }

    return (
        <FormModal title="Adicionar Item" pending={false}>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-12">
                    <Label>Nome</Label>
                    <Input
                        name="name"
                        value={itemForm.name}
                        onChange={handleItemChange}
                    />
                </div>

                <div className="col-span-6 lg:col-span-4">
                    <Label>Quantidade</Label>
                    <div className="flex justify-center items-center">
                        <Button variant="outline" type="button" onClick={decreaseQuantity} className="mr-2 cursor-pointer">
                            <HugeiconsIcon icon={MinusSignIcon} size="icon" />
                        </Button>
                        <Input
                            name="quantity"
                            type="number"
                            className="text-center"
                            min={1}
                            value={itemForm.quantity}
                            onChange={handleItemChange}
                        />
                        <Button variant="outline" type="button" onClick={increaseQuantity} className="ml-2 cursor-pointer">
                            <HugeiconsIcon icon={PlusSignIcon} size="icon" />
                        </Button>
                    </div>
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
                    <RichTextEditor
                        value={itemForm.description}
                        onChange={(html: string) => handleChangeObservation(html)}
                    />
                </div>

                <div className="col-span-12 flex justify-end items-center">
                    <Button onClick={() => handleAddItem(itemForm)} className="cursor-pointer">
                        <HugeiconsIcon icon={Add01Icon} />
                        Adicionar Item
                    </Button>
                </div>
            </div>
        </FormModal>
    )
}