import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import { auth } from "@clerk/nextjs/server";
import { ActiveLink } from "@/components/ActiveLink";

export default function Header() {
  //? destructure the userId for Auth
  const { userId } = auth();
  //
  return (
    <>
      <nav className="flex flex-row gap-5 justify-end flex-wrap min-w-max text-lg p-5 pr-10">
        <ActiveLink href="/">
          <p>Home</p>
        </ActiveLink>
        <ActiveLink href={"/movie-page"}>
          <p>Movie-page</p>
        </ActiveLink>
        {/* <ActiveLink href="/posts">
          <p>Post Feed</p>
        </ActiveLink>
        <ActiveLink href={`/user/${userId}`}>
          <p>Profile</p>
        </ActiveLink> */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignUpButton>Sign Up</SignUpButton>
          <SignInButton>Sign In</SignInButton>
        </SignedOut>
      </nav>
    </>
  );
}
