import { SignOutButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <SignOutButton />
      </div>
    </main>
  );
}
