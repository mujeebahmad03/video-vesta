/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LoadingButtonProps {
  isLoading: boolean;
  text: string;
  loadingText: string;
  [key: string]: any;
}

export const LoadingButton = ({
  isLoading,
  text,
  loadingText,
  ...props
}: LoadingButtonProps) => (
  <Button {...props}>
    {isLoading ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {loadingText}
      </motion.div>
    ) : (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.div>
    )}
  </Button>
);
