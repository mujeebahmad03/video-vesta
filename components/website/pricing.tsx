"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const plans = [
  {
    name: "Basic",
    price: { monthly: 9, annually: 99 },
    features: [
      "720p video quality",
      "5 hours of recording per month",
      "Basic editing tools",
      "Email support",
      "1 user",
    ],
    notIncluded: [
      "1080p video quality",
      "Unlimited recording",
      "Advanced editing tools",
      "Priority support",
      "Team collaboration",
    ],
  },
  {
    name: "Pro",
    price: { monthly: 19, annually: 199 },
    features: [
      "1080p video quality",
      "20 hours of recording per month",
      "Advanced editing tools",
      "Priority email support",
      "3 users",
    ],
    notIncluded: ["Unlimited recording", "Team collaboration"],
  },
  {
    name: "Enterprise",
    price: { monthly: 49, annually: 499 },
    features: [
      "4K video quality",
      "Unlimited recording",
      "Advanced editing tools",
      "24/7 priority support",
      "Unlimited users",
      "Team collaboration",
    ],
    notIncluded: [],
  },
];

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      className="py-24 bg-background relative overflow-hidden"
      id="pricing"
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
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Select the perfect plan for your video creation needs
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span
              className={`text-sm ${
                !isAnnual ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Monthly
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span
              className={`text-sm ${
                isAnnual ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Annual <span className="text-xs text-primary">(Save 15%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-card shadow-lg border border-muted h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      ${isAnnual ? plan.price.annually : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">
                      {isAnnual ? "/year" : "/month"}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-muted-foreground"
                      >
                        <X className="h-5 w-5 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Choose {plan.name}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] pointer-events-none" />
    </section>
  );
};
