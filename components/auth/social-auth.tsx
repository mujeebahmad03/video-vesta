"use client";

import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ToastMessage } from "@/components/ui/toast-message";

interface SocialSignInProps {
  type: "signUp" | "signIn";
}

export function SocialSignIn({ type }: SocialSignInProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSocialSignIn = async (provider: string) => {
    setIsLoading(provider);
    try {
      // Here you would typically call your API to handle social sign-in
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
      toast.success(
        <ToastMessage
          title={`${
            type === "signUp" ? "Signed up" : "Signed in"
          } with ${provider}`}
          description="You have successfully authenticated."
        />
      );
    } catch (error) {
      console.log({ error });
      toast.error(
        <ToastMessage
          title="Error"
          description={`Failed to ${
            type === "signUp" ? "sign up" : "sign in"
          } with ${provider}. Please try again.`}
        />
      );
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSocialSignIn("Google")}
        disabled={!!isLoading}
      >
        {isLoading === "Google" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {type === "signUp" ? "Signing up..." : "Signing in..."}
          </motion.div>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            {type === "signUp" ? "Sign up" : "Sign in"} with Google
          </>
        )}
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSocialSignIn("GitHub")}
        disabled={!!isLoading}
      >
        {isLoading === "GitHub" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {type === "signUp" ? "Signing up..." : "Signing in..."}
          </motion.div>
        ) : (
          <>
            <Github className="mr-2 h-4 w-4" />
            {type === "signUp" ? "Sign up" : "Sign in"} with GitHub
          </>
        )}
      </Button>
    </div>
  );
}
