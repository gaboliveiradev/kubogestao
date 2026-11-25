"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { saveBudgetSettings } from "@/actions/settings/save-budget-settings.action";
import { InputError } from "@/components/form/InputError";
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ServiceResponse } from "@/types/service-response";
import { BudgetSettings, DeliveryDaysType } from "@/types/user-settings";
import {
    BUDGET_PLACEHOLDERS,
    DEFAULT_OBSERVATION,
    resolveBudgetPlaceholders,
} from "@/utils/functions/budget-placeholders";
import { handleFormFeedback } from "@/utils/sonner";
import { CheckmarkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const PREVIEW_TOTAL = 7600;

export default function BudgetSettingsForm({ initial }: { initial: BudgetSettings }) {
    const [state, formAction, pending] = useActionState<ServiceResponse, FormData>(saveBudgetSettings, {
        success: null,
        message: "",
    });

    const [observation, setObservation] = useState(initial.default_observation);
    const [deliveryDays, setDeliveryDays] = useState(String(initial.default_delivery_days));
    const [deliveryType, setDeliveryType] = useState<DeliveryDaysType>(initial.delivery_days_type);
    const [validityDays, setValidityDays] = useState(String(initial.validity_days));
    const [autoApply, setAutoApply] = useState(initial.auto_apply_observation);

    useEffect(() => {
        handleFormFeedback({ state });
    }, [state]);

    const preview = useMemo(
        () =>
            resolveBudgetPlaceholders(observation, {
                total: PREVIEW_TOTAL,
                clientName: "Cliente Exemplo LTDA",
                budgetKey: "ORC-0001",
                settings: {
                    default_delivery_days: Number(deliveryDays) || 0,
                    delivery_days_type: deliveryType,
                    validity_days: Number(validityDays) || 0,
                },
            }),
        [observation, deliveryDays, deliveryType, validityDays]
    );

    const errors = state.errors ?? {};

    return (
        <form action={formAction} className="space-y-8">
            <input type="hidden" name="default_observation" value={observation} />
            <input type="hidden" name="delivery_days_type" value={deliveryType} />
            <input type="hidden" name="auto_apply_observation" value={String(autoApply)} />

            {/* Prazos */}
            <div className="grid gap-6 rounded-2xl border bg-card p-5 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="default_delivery_days">Prazo de entrega (dias)</Label>
                    <div className="flex items-center gap-3">
                        <Input
                            id="default_delivery_days"
                            name="default_delivery_days"
                            type="number"
                            min={1}
                            inputMode="numeric"
                            className="w-24"
                            value={deliveryDays}
                            onChange={(e) => setDeliveryDays(e.target.value)}
                            aria-invalid={!!errors.default_delivery_days}
                        />
                        <div className="grid flex-1 grid-cols-2 gap-1 rounded-xl bg-muted p-1">
                            {([
                                ["business", "Úteis"],
                                ["calendar", "Corridos"],
                            ] as const).map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setDeliveryType(value)}
                                    className={`h-9 cursor-pointer rounded-lg text-sm font-medium transition-colors ${deliveryType === value
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <InputError text={errors.default_delivery_days} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="validity_days">Validade do orçamento (dias)</Label>
                    <Input
                        id="validity_days"
                        name="validity_days"
                        type="number"
                        min={1}
                        inputMode="numeric"
                        className="w-24"
                        value={validityDays}
                        onChange={(e) => setValidityDays(e.target.value)}
                        aria-invalid={!!errors.validity_days}
                    />
                    <InputError text={errors.validity_days} />
                </div>
            </div>

            {/* Observação padrão */}
            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <Label>Observação padrão</Label>

                    <button
                        type="button"
                        role="switch"
                        aria-checked={autoApply}
                        onClick={() => setAutoApply((v) => !v)}
                        className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground"
                    >
                        <span className={`relative h-6 w-11 rounded-full transition-colors ${autoApply ? "bg-primary" : "bg-muted-foreground/30"}`}>
                            <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${autoApply ? "left-5.5" : "left-0.5"}`} />
                        </span>
                        Aplicar em novos orçamentos
                    </button>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                        <RichTextEditor
                            value={observation}
                            onChange={setObservation}
                            heightClassName="h-80"
                            renderToolbarExtra={(editor) => (
                                <div className="mt-1 flex w-full flex-wrap gap-1.5 border-t pt-2">
                                    {BUDGET_PLACEHOLDERS.map((p) => (
                                        <button
                                            key={p.key}
                                            type="button"
                                            title={`${p.description} — {{${p.key}}}`}
                                            onClick={() => editor.chain().focus().insertContent(`{{${p.key}}}`).run()}
                                            className="cursor-pointer rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        />
                        <InputError text={errors.default_observation} />
                        <button
                            type="button"
                            className="cursor-pointer text-xs text-muted-foreground underline-offset-2 hover:underline"
                            onClick={() => setObservation(DEFAULT_OBSERVATION)}
                        >
                            Restaurar modelo
                        </button>
                    </div>

                    <div
                        className="h-[26.5rem] overflow-y-auto rounded-xl border border-dashed bg-muted/30 p-4 text-sm leading-relaxed [&_p:empty]:h-4 [&_p]:min-h-[1.25em] [&_p]:break-words"
                        dangerouslySetInnerHTML={{ __html: preview || "<p style='opacity:.5'>Pré-visualização</p>" }}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={pending} className="h-11 cursor-pointer px-6 text-sm">
                    <HugeiconsIcon icon={CheckmarkSquare02Icon} />
                    {pending ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    );
}
