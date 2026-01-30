"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight, Sparkles } from "@hugeicons/core-free-icons";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 border border-primary-foreground/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-primary-foreground/20 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-primary-foreground/30 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-primary-foreground/20 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-8"
          >
            <HugeiconsIcon icon={Sparkles} className="w-8 h-8 text-primary-foreground" />
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-6">
            Comece agora a organizar seus clientes e orçamentos
          </h2>

          <p className="text-lg text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já transformaram sua gestão
            com o KuboGestao. Acesso vitalício por apenas <span className="font-extrabold">R$ 297,90</span>.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="secondary" size="lg" className="shadow-lg cursor-pointer">
              Assinar Agora
              <HugeiconsIcon icon={ArrowRight} className="ml-2" />
            </Button>
          </motion.div>

          {/* Sub Text */}
          <p className="mt-6 text-sm text-primary-foreground/80">
            Garantia de 7 dias • Pagamento seguro • Acesso imediato
          </p>
        </motion.div>
      </div>
    </section>
  );
}
