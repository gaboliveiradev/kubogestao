"use client";

import { Check } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Mais Organização",
    description:"Centralize todas as informações dos seus clientes e projetos em um único lugar acessível.",
  },
  {
    title: "Economia de Tempo",
    description: "Automatize tarefas repetitivas e foque no que realmente importa para o seu negócio.",
  },
  {
    title: "Aparência Profissional",
    description: "Impressione seus clientes com orçamentos elegantes e comunicações bem elaboradas.",
  },
  {
    title: "Centralização das Informações",
    description: "Acesse dados de qualquer lugar, a qualquer momento, com total segurança.",
  },
  {
    title: "Melhor Controle Financeiro",
    description: "Acompanhe receitas, despesas e fluxo de caixa com dashboards intuitivos.",
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              Benefícios
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
              Por que escolher o{" "}
              <span className="text-primary">KuboGestao</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Uma plataforma pensada para simplificar sua gestão e impulsionar
              seus resultados. Descubra como podemos ajudar seu negócio a
              crescer.
            </p>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-accent/50 transition-colors duration-200"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <HugeiconsIcon icon={Check} className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-purple-deep/10 rounded-3xl" />
            
            {/* Stats Cards */}
            <div className="relative p-8">
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-card p-6 rounded-2xl shadow-card border border-border"
                >
                  <div className="text-4xl font-extrabold text-primary mb-2">98%</div>
                  <p className="text-muted-foreground text-sm">
                    Taxa de satisfação dos clientes
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-card p-6 rounded-2xl shadow-card border border-border"
                >
                  <div className="text-4xl font-extrabold text-primary mb-2">50%</div>
                  <p className="text-muted-foreground text-sm">
                    Redução no tempo de gestão
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-card p-6 rounded-2xl shadow-card border border-border"
                >
                  <div className="text-4xl font-extrabold text-primary mb-2">+5K</div>
                  <p className="text-muted-foreground text-sm">
                    Empresas confiam em nós
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-card p-6 rounded-2xl shadow-card border border-border"
                >
                  <div className="text-4xl font-extrabold text-primary mb-2">24/7</div>
                  <p className="text-muted-foreground text-sm">
                    Suporte disponível sempre
                  </p>
                </motion.div>
              </div>

              {/* Decorative Circles */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-primary/20 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
