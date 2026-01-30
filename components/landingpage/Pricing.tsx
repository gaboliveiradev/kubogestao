"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Check, Crown, Star, Zap } from "@hugeicons/core-free-icons";

const features = [
  "Clientes ilimitados",
  "Orçamentos ilimitados em PDF",
  "Gestão de cobranças",
  "Disparo de e-mails automáticos",
  "Relatórios financeiros",
  "Suporte prioritário",
  "Atualizações gratuitas para sempre",
  "Backup automático dos dados",
];

export function Pricing() {
  return (
    <section id="planos" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-deep/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Planos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
            Um único investimento,{" "}
            <span className="text-primary">acesso vitalício</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Sem mensalidades, sem taxas escondidas. Pague uma vez e use para sempre.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="relative">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-100">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg">
                <HugeiconsIcon icon={Crown} className="w-4 h-4" />
                Oferta Especial
              </span>
            </div>

            <div className="bg-card rounded-3xl p-8 md:p-10 border-2 border-primary/30 shadow-card-hover relative overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-purple-deep/5" />

              <div className="relative">
                {/* Plan Name */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <HugeiconsIcon icon={Zap} className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-extrabold text-foreground">Plano Vitalício</h3>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-lg text-muted-foreground line-through">R$ 597,90</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl md:text-6xl font-extrabold text-primary">R$ 297,90</span>
                  </div>
                  <p className="text-muted-foreground mt-2">Pagamento único • Acesso vitalício</p>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <HugeiconsIcon icon={Check} className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button size="lg" className="w-full">
                  Garantir meu acesso agora
                </Button>

                {/* Guarantee */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <HugeiconsIcon icon={Star} className="w-4 h-4 text-primary" />
                  <span>Garantia de 7 dias ou seu dinheiro de volta</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Pagamento 100% seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <span>PIX, Boleto ou Cartão</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>Acesso imediato</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
