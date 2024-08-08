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
import Image from "next/image";

const apiKey = process.env.API_KEY;

export default async function Home() {
  //fetching image to use for bg
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/533535?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response.json();
  return (
    <main className="h-screen w-[100%] flex min-h-screen flex-col items-center  bg-gradient-to-r from-cyan-950 to-blue-950">
      <Image
        className="pt-[15vh] pr-10 pl-10"
        src={"/eggscape-logo.png"}
        alt="logo"
        width={600}
        height={375}
      />

      <br></br>
      <Text className="z-10 text-center ">
        The home for finding and sharing movies
      </Text>
      <br></br>
      <br></br>
      <Card>
        <Flex
          direction="column"
          justify="between"
          align="center"
          wrap="wrap"
          gap={"5"}
        >
          <SignedIn>
            <UserButton />
            <Button size="4" color="orange" variant="outline">
              <SignOutButton />
            </Button>
            <a href={`/user/userId`}>
              <Button size="4" color="blue" variant="outline">
                Profile
              </Button>
            </a>
          </SignedIn>
          <SignedOut>
            <Button size="4" color="orange">
              <SignUpButton mode="modal" />
            </Button>
            <Button size="4" color="orange" variant="outline">
              <SignInButton mode="modal" />
            </Button>
          </SignedOut>
        </Flex>
      </Card>
    </main>
  );
}
