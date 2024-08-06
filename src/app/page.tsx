// import Header from "@/components/Header";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button, Flex, Text, Card } from "@radix-ui/themes";

export default function Home() {
  return (
    <main className="h-screen w-[100%] flex min-h-screen flex-col items-center bg-gradient-to-r from-cyan-900 to-blue-900">
      <h1 className="pt-[30vh] z-10 text-6xl font-bold text-center ">
        Eggscape
      </h1>
      <br></br>
      <Text className="z-10 text-center ">
        The home for finding and sharing movies
      </Text>
      <br></br>
      <br></br>
      <Card>
        <Flex direction="column" justify="between" wrap="wrap" gap={"5"}>
          <SignedIn>
            <UserButton />
            <Button size="4" color="orange" variant="outline">
              <SignOutButton />
            </Button>
          </SignedIn>
          <SignedOut>
            <Button size="4" color="orange">
              <SignUpButton />
            </Button>
            <Button size="4" color="orange" variant="outline">
              <SignInButton />
            </Button>
          </SignedOut>
        </Flex>
      </Card>
    </main>
  );
}
