"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import BasicStep from "./steps/BasicStep";
import AddressStep from "./steps/AddressStep";
import VisualStep from "./steps/VisualStep";
import PaymentStep from "./steps/PaymentStep";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft, ArrowRight, CheckmarkSquare02Icon } from "@hugeicons/core-free-icons";

const steps = [
  "Dados Básicos",
  "Dados Endereço",
  "Identidade Visual",
  "Forma de Pagamento",
];

export default function OnboardingSteps() {
  const [logo, setLogo] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
  }

  function prev() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <div>
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((label, index) => (
          <div key={label} className="flex-1 text-center">
            <div
              onClick={() => setStep(index)}
              className={`mx-auto h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${index <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-2 block">{label}</span>
          </div>
        ))}
      </div>

      {/* Conteúdo */}
      {step === 0 && <BasicStep />}
      {step === 1 && <AddressStep />}
      {step === 2 && <VisualStep logo={logo} onChange={setLogo} />}
      {step === 3 && <PaymentStep />}

      {/* Navegação */}
      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={prev} disabled={step === 0}>
          <HugeiconsIcon icon={ArrowLeft} />
          Voltar
        </Button>

        <Button onClick={next}>
          {step === steps.length - 1 ? "Finalizar e Pagar" : "Próximo"}
          <HugeiconsIcon icon={step === steps.length - 1 ? CheckmarkSquare02Icon : ArrowRight} />
        </Button>
      </div>
    </div>
  );
}
