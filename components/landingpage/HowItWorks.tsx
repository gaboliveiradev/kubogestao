"use client";

import { BarChart, FileText, UserGroup02Icon, UserPlus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Crie sua conta",
    description: "Cadastre-se em menos de 2 minutos. Sem burocracia, sem complicação.",
  },
  {
    number: "02",
    icon: UserGroup02Icon,
    title: "Cadastre seus clientes",
    description: "Importe ou adicione manualmente os dados dos seus clientes na plataforma.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Gere e envie orçamentos",
    description: "Crie orçamentos profissionais em PDF e envie diretamente por e-mail.",
  },
  {
    number: "04",
    icon: BarChart,
    title: "Controle cobranças e finanças",
    description: "Acompanhe pagamentos, gerencie cobranças e tenha visão completa das suas finanças.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Como funciona
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
            Comece a usar em{" "}
            <span className="text-primary">4 passos simples</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Processo rápido e intuitivo para você começar a gerenciar seu
            negócio de forma profissional.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-cta text-primary-foreground text-sm font-extrabold">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mt-4">
                    <HugeiconsIcon icon={step.icon} className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
