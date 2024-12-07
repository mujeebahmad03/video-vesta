"use client";

import { useSignIn, useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { Github, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SocialSignInProps {
  type: "signUp" | "signIn";
}

export function SocialSignIn({ type }: SocialSignInProps) {
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  if (!signIn || !signUp) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  async function handleSignIn(strategy: OAuthStrategy) {
    if (!signIn || !signUp) return null;

    // If the user has an account in your application, but does not yet
    // have an OAuth account connected to it, you can transfer the OAuth
    // account to the existing user account.
    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === "transferable" &&
      signUp.verifications.externalAccount.error?.code ===
        "external_account_exists";

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true });

      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    }

    // If the user has an OAuth account but does not yet
    // have an account in your app, you can create an account
    // for them using the OAuth information.
    const userNeedsToBeCreated =
      signIn.firstFactorVerification.status === "transferable";

    if (userNeedsToBeCreated) {
      const res = await signUp.create({
        transfer: true,
      });

      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    } else {
      // If the user has an account in your application
      // and has an OAuth account connected to it, you can sign them in.
      signInWith(strategy);
    }
  }

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSignIn("oauth_google")}
      >
        <Mail className="mr-2 h-4 w-4" />
        {type === "signUp" ? "Sign up" : "Sign in"} with Google
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSignIn("oauth_github")}
      >
        <Github className="mr-2 h-4 w-4" />
        {type === "signUp" ? "Sign up" : "Sign in"} with GitHub
      </Button>
    </div>
  );
}
