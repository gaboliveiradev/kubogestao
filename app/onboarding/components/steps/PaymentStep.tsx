"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PaymentStep() {
  const [method, setMethod] = useState<"pix" | "credit" | null>('pix');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* PIX */}
      <Card
        onClick={() => setMethod("pix")}
        className={`relative overflow-visible p-6 cursor-pointer border-2 transition-all ${method === "pix"
          ? "border-primary ring-2 ring-primary/20"
          : "border-border"
          }`}
      >
        {/* Badge */}
        <Badge className="absolute -top-3 left-4 z-100 font-extrabold">
          🔥 Mais utilizado
        </Badge>

        <h3 className="font-semibold text-lg">Pix</h3>

        <div>
          <p className="text-2xl text-primary font-extrabold">
            R$ 197,90
          </p>
          <p className="text-sm text-muted-foreground">
            Pagamento único • acesso vitalício ♾️
          </p>
        </div>
      </Card>

      {/* CARTÃO */}
      <Card
        className="relative overflow-visible p-6 border-2 border-dashed border-border opacity-70 cursor-not-allowed"
      >
        <Badge variant="secondary" className="border border-[#acacac] absolute -top-3 left-4 z-100">
          Em breve
        </Badge>

        <h3 className="font-semibold text-lg">
          Cartão de Crédito
        </h3>

        <div>
          <p className="text-xl text-primary font-extrabold">
            10x de R$ 19,79
          </p>
          <p className="text-sm text-muted-foreground">
            Total R$ 197,90 • acesso vitalício ♾️
          </p>
        </div>
      </Card>
    </div>
  );
}
