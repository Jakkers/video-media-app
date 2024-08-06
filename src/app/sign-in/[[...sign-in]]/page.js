import { SignIn } from "@clerk/nextjs";
import Header from "@/components/Header";

export default function SignInPage() {
  return (
    <>
      <Header />
      <SignIn />
      {/* <SignInButton /> */}
    </>
  );
}
