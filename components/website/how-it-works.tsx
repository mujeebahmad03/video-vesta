"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create your account in seconds. No credit card required.",
  },
  {
    number: "02",
    title: "Record",
    description: "Click record and capture your content with ease.",
  },
  {
    number: "03",
    title: "Share",
    description: "Share your video instantly with anyone, anywhere.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      className="py-24 bg-muted/30 relative overflow-hidden"
      id="how-it-works"
    >
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get started in minutes with our simple three-step process
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-6 rounded-xl bg-background shadow-lg border border-muted h-full flex flex-col justify-between"
              >
                <div>
                  <span className="absolute -top-4 -left-4 text-7xl font-bold text-primary/10">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold mb-2 mt-4 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                <motion.div
                  className="mt-4 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] pointer-events-none" />
    </section>
  );
};
