import Header from "@/components/Header";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <h1>Media App</h1>
      <SignInButton />
      <SignUpButton />
    </main>
  );
}
