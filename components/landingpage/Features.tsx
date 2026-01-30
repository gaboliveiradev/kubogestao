"use client";

import { CreditCardIcon, File02Icon, Mail01Icon, PieChart, Shield, UserGroupIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";

const features = [
  {
    icon: File02Icon,
    title: "Geração de Orçamentos em PDF",
    description: "Crie orçamentos profissionais em segundos e envie diretamente para seus clientes em formato PDF.",
  },
  {
    icon: UserGroupIcon,
    title: "Controle de Clientes",
    description: "Gerencie todos os seus clientes em um só lugar, com histórico completo e informações organizadas.",
  },
  {
    icon: CreditCardIcon,
    title: "Gestão de Cobranças",
    description: "Acompanhe pagamentos, envie lembretes automáticos e nunca mais perca uma cobrança.",
  },
  {
    icon: Mail01Icon,
    title: "Disparo de E-mails Automáticos",
    description: "Automatize a comunicação com seus clientes através de e-mails personalizados.",
  },
  {
    icon: PieChart,
    title: "Controle Financeiro Simplificado",
    description: "Visualize suas finanças de forma clara com relatórios e gráficos intuitivos.",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Seus dados protegidos com criptografia de ponta e backups automáticos.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Features() {
  return (
    <section id="funcionalidades" className="py-24 bg-gradient-subtle">
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
            Funcionalidades
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
            Tudo que você precisa para{" "}
            <span className="text-primary">gerenciar seu negócio</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ferramentas poderosas e intuitivas para simplificar sua rotina e
            aumentar sua produtividade.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <HugeiconsIcon icon={feature.icon} className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
