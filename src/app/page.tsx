// import Header from "@/components/Header";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { Button, Flex, Heading, Separator, Card } from "@radix-ui/themes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1>Eggscape</h1>
      <Card>
        <Flex direction="column" justify="between" wrap="wrap" gap={"5"}>
          <Button color="orange" variant="outline">
            <SignInButton />
          </Button>
          <Button color="orange" variant="outline">
            <SignUpButton />
          </Button>
          <Button color="orange" variant="outline">
            <SignOutButton />
          </Button>
        </Flex>
      </Card>
    </main>
  );
}
