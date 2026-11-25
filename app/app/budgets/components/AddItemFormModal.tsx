import FormModal from "@/components/form/FormModal";
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";
import { ModalFooter, ModalFooterButton } from "@/components/form/ModalFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModalContext } from "@/context/modal-context";
import { BudgetItem, BudgetItemForm } from "@/hooks/use-budget-item";
import { formatCurrency } from "@/utils/functions/string";
import { Add01Icon, CancelSquareIcon, CheckmarkSquare02Icon, MinusSignIcon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

type Props = {
    /** Quando informado, a modal entra em modo de edição. */
    item?: BudgetItem,
    /** Deve retornar true quando salvou com sucesso (a modal então fecha). */
    onSubmit: (itemForm: BudgetItemForm) => boolean,
}

export default function AddItemFormModal({ item, onSubmit }: Props) {
    const { closeModal } = useModalContext();
    const isEditing = !!item;

    const [itemForm, setItemForm] = useState<BudgetItemForm>({
        name: item?.name ?? "",
        quantity: item?.quantity ?? 1,
        value: item ? formatCurrency(item.value) : "",
        description: item?.description ?? "",
    });

    function handleItemChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setItemForm(prev => ({ ...prev, [name]: value }));
    }

    function decreaseQuantity() {
        setItemForm(prev => ({ ...prev, quantity: Math.max(1, Number(prev.quantity) - 1) }));
    }

    function increaseQuantity() {
        setItemForm(prev => ({ ...prev, quantity: Number(prev.quantity) + 1 }));
    }

    function handleSubmit() {
        if (onSubmit(itemForm)) closeModal();
    }

    return (
        <FormModal
            title={isEditing ? "Editar Item" : "Adicionar Item"}
            description={isEditing ? "Altere os dados do item do orçamento." : "Informe os dados do novo item do orçamento."}
            pending={false}
        >
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 space-y-2">
                    <Label>Nome</Label>
                    <Input name="name" value={itemForm.name} onChange={handleItemChange} />
                </div>

                <div className="col-span-6 lg:col-span-4 space-y-2">
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

                <div className="col-span-6 lg:col-span-8 space-y-2">
                    <Label>Valor Unitário (R$)</Label>
                    <Input
                        name="value"
                        inputMode="numeric"
                        value={itemForm.value}
                        onChange={(e) => setItemForm(prev => ({ ...prev, value: formatCurrency(e.target.value) }))}
                    />
                </div>

                <div className="col-span-12">
                    <RichTextEditor
                        value={itemForm.description}
                        onChange={(html: string) => setItemForm(prev => ({ ...prev, description: html }))}
                    />
                </div>

                <ModalFooter>
                    <ModalFooterButton type="button" variant="outline" onClick={closeModal}>
                        <HugeiconsIcon icon={CancelSquareIcon} />
                        Cancelar
                    </ModalFooterButton>
                    <ModalFooterButton type="button" onClick={handleSubmit}>
                        <HugeiconsIcon icon={isEditing ? CheckmarkSquare02Icon : Add01Icon} />
                        {isEditing ? "Salvar Alterações" : "Adicionar Item"}
                    </ModalFooterButton>
                </ModalFooter>
            </div>
        </FormModal>
    )
}
