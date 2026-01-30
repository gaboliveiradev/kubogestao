"use client";

import { Quote, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Engenheiro Civil",
    avatar: "CS",
    content:
      "O KuboGestao transformou a forma como gerencio meus orçamentos. Antes perdia horas fazendo manualmente, agora são minutos!",
    rating: 5,
  },
  {
    name: "Marina Santos",
    role: "Arquiteta",
    avatar: "MS",
    content:
      "Plataforma incrível! Meus clientes elogiam a aparência profissional dos orçamentos. Recomendo demais!",
    rating: 5,
  },
  {
    name: "Roberto Oliveira",
    role: "Prestador de Serviços",
    avatar: "RO",
    content:
      "Finalmente consegui organizar minhas finanças e cobranças. O controle de clientes é sensacional.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-subtle">
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
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
            O que nossos{" "}
            <span className="text-primary">clientes dizem</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Milhares de profissionais já transformaram sua gestão com o KuboGestao.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-card-hover transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <HugeiconsIcon icon={Quote} className="absolute top-6 right-6 w-8 h-8 text-primary/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <HugeiconsIcon
                    icon={Star}
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                <q>{testimonial.content}</q>
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-cta flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
