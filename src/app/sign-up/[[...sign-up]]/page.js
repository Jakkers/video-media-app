import { SignUp } from "@clerk/nextjs";
import Header from "@/components/Header";

export default function SignUpPage() {
  return (
    <>
      <Header />
      <SignUp />
    </>
  );
}
