import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import { auth } from "@clerk/nextjs/server";
import { ActiveLink } from "@/components/ActiveLink";

//importing theme
import { Button, Flex, Heading, Card } from "@radix-ui/themes";

export default function Header() {
  //? destructure the userId for Auth
  const { userId } = auth();
  //
  return (
    <>
      <nav className="sticky top-0 sm:bottom-0 z-40 pt-4 max-w-[1450px] self-center">
        <Card>
          <Flex direction="row" justify="between" wrap="wrap">
            <Heading>Eggscape</Heading>
            <ActiveLink href="/">
              <p>Home</p>
            </ActiveLink>
            <ActiveLink href={"/movie-page"}>
              <p>Movie-page</p>
            </ActiveLink>
            {/* <ActiveLink href="/posts">
          <p>Post Feed</p>
        </ActiveLink> */}
            <ActiveLink href={`/user/${userId}`}>
              <p>Profile</p>
            </ActiveLink>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button color="orange">
                <SignUpButton>Sign Up</SignUpButton>
              </Button>
              <Button color="orange" variant="outline">
                <SignInButton>Sign In</SignInButton>
              </Button>
            </SignedOut>
          </Flex>
        </Card>
      </nav>
    </>
  );
}
