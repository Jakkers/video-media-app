import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { ShowGenresMenu } from "@/components/CatergoriesMenu";
import { auth } from "@clerk/nextjs/server";

import SearchBar from "@/components/SearchBar";

//importing theme
import {
  Button,
  Flex,
  Heading,
  Card,
  Container,
  DropdownMenu,
} from "@radix-ui/themes";
import Link from "next/link";

export default function Header() {
  //? destructure the userId for Auth
  const { userId } = auth();
  //
  return (
    <nav className="sticky top-0 z-40 pt-2 self-center">
      <Container size="4">
        <Card>
          <Flex gap="2" direction="row" justify="between" wrap="wrap">
            <Link href="/">
              <Heading>Eggscape</Heading>
            </Link>
            {/* Signed in buttons  */}
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
            {/* showing genres  */}
            <ShowGenresMenu />
            {/* Adding a search bar */}
            <SearchBar />
            {/* Adding a DropdownMenu */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="soft">
                  Menu
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <Link href={`/user/${userId}`}>
                    <p>Profile</p>
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  {" "}
                  <Link href={"/movie-page"}>
                    <p>Movies</p>
                  </Link>
                </DropdownMenu.Item>

                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  {" "}
                  <Link href="/">
                    <p>Home</p>
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
        </Card>
      </Container>
    </nav>
  );
}
