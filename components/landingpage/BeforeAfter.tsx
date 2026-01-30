"use client";

import { AlertTriangle, Cancel01Icon, Check, Clock, File, Mail, Smartphone, TrendingUp, UserGroup02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";

const beforeItems = [
  {
    icon: File,
    text: "Orçamentos feitos no Word ou Excel",
  },
  {
    icon: UserGroup02Icon,
    text: "Clientes anotados em cadernos ou planilhas",
  },
  {
    icon: Clock,
    text: "Horas perdidas organizando informações",
  },
  {
    icon: AlertTriangle,
    text: "Cobranças esquecidas e dinheiro perdido",
  },
  {
    icon: Mail,
    text: "E-mails enviados manualmente um por um",
  },
];

const afterItems = [
  {
    icon: File,
    text: "PDFs profissionais gerados em segundos",
  },
  {
    icon: UserGroup02Icon,
    text: "Base de clientes organizada e acessível",
  },
  {
    icon: Clock,
    text: "Tempo livre para focar no que importa",
  },
  {
    icon: TrendingUp,
    text: "Cobranças automáticas e receita recuperada",
  },
  {
    icon: Smartphone,
    text: "Tudo integrado em uma única plataforma",
  },
];

export function BeforeAfter() {
  return (
    <section className="py-24 bg-background">
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
            Transformação
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
            Veja a <span className="text-primary">diferença</span> na sua rotina
          </h2>
          <p className="text-lg text-muted-foreground">
            Compare como era antes e como será depois de usar o KuboGestao
          </p>
        </motion.div>

        {/* Before/After Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-card rounded-2xl p-8 border border-destructive/30 h-full">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <HugeiconsIcon icon={Cancel01Icon} className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-foreground">Antes</h3>
                  <p className="text-sm text-muted-foreground">Sem o KuboGestao</p>
                </div>
              </div>

              {/* Items */}
              <ul className="space-y-4">
                {beforeItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <HugeiconsIcon icon={item.icon} className="w-5 h-5 text-destructive" />
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-foreground">{item.text}</p>
                    </div>
                    <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5 text-destructive mt-2.5 shrink-0" />
                  </motion.li>
                ))}
              </ul>

              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-linear-to-br from-destructive/5 to-transparent rounded-2xl pointer-events-none" />
            </div>
          </motion.div>

          {/* After Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card rounded-2xl p-8 border border-primary/30 h-full shadow-card-hover">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <HugeiconsIcon icon={Check} className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-foreground">Depois</h3>
                  <p className="text-sm text-muted-foreground">Com o KuboGestao</p>
                </div>
              </div>

              {/* Items */}
              <ul className="space-y-4">
                {afterItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <HugeiconsIcon icon={item.icon} className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-foreground">{item.text}</p>
                    </div>
                    <HugeiconsIcon icon={Check} className="w-5 h-5 text-primary mt-2.5 shrink-0" />
                  </motion.li>
                ))}
              </ul>

              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent rounded-2xl pointer-events-none" />
              
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary/20 to-purple-600/20 rounded-2xl blur opacity-30 -z-10" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "70%", label: "Menos tempo gasto" },
            { value: "3x", label: "Mais organização" },
            { value: "100%", label: "Controle financeiro" },
            { value: "∞", label: "Tranquilidade" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-primary mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
