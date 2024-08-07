"use client";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function ErrorPage({ error, reset }) {
  return (
    <Container className="ml-2 mr-2 mt-2" size="4">
      <Flex align={"center"} direction={"column"}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Heading size={"9"} className="text-6xl text-red-600">
          ERROR
        </Heading>
        <Text type={"p"} size={"4"} className="mt-2 mb-2">
          {error.message}
        </Text>

        <a href="/movie-page">
          <Button size="3">Movies</Button>
        </a>
        <br />
        <a href="/tv-page">
          <Button size="3">Tv Shows</Button>
        </a>
        <br />
        <a href="/user/userId">
          <Button color="orange" size="3">
            Profile
          </Button>
        </a>
      </Flex>
    </Container>
  );
}
