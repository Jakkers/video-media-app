"use client";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function NotFound() {
  return (
    <Container className="ml-2 mr-2 mt-2" size="4">
      <Flex align={"center"} direction={"column"}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Heading size={"9"}>Sorry this has not been found</Heading>

        <Text size={"5"} type={"p"} className="mt-2">
          {" "}
          why dont you go back to something else
        </Text>
        <br />
        <a href="/movie-page">
          <Button>Movies</Button>
        </a>
        <br />
        <a href="/tv-page">
          <Button>Tv Shows</Button>
        </a>
        <br />
        <a href="/user/userId">
          <Button color="orange">Profile</Button>
        </a>
        {/* <Button onClick={() => reset()}>Reset</Button> */}
      </Flex>
    </Container>
  );
}
