"use client";

import { motion } from "framer-motion";
import { Laptop, Video, Share2, Zap } from "lucide-react";

const features = [
  {
    icon: <Video className="h-8 w-8" />,
    title: "Easy Recording",
    description:
      "Start recording with a single click. Capture your screen, camera, or both simultaneously.",
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: "Instant Sharing",
    description:
      "Share your videos instantly with a generated link or embed them directly on your website.",
  },
  {
    icon: <Laptop className="h-8 w-8" />,
    title: "Cross-Platform",
    description:
      "Record and access your videos from any device. No installation required.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Fast",
    description:
      "Experience minimal delay between recording and sharing. Built for speed.",
  },
];

export const Features = () => {
  return (
    <section
      className="py-24 bg-background relative overflow-hidden"
      id="features"
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
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to create and share amazing videos
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 rounded-xl bg-card hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between border border-muted"
              >
                <div>
                  <div className="mb-4 text-primary bg-primary/10 p-3 rounded-full inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
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
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none" />
    </section>
  );
};
