import Link from "next/link";
import { Flex, Card, Container, Text, Strong } from "@radix-ui/themes";
import { BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <Container className="pt-8 pb-8" size="4">
      <Card>
        <Flex
          justify="center"
          align="center"
          wrap="wrap"
          gap={"5"}
          className="flex flex-col md:flex-row"
        >
          <Strong className="md:pr-12">App made by</Strong>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/jake-darby-463358106/"
          >
            <BsLinkedin />
          </Link>
          <Link
            className="md:pr-8"
            target="_blank"
            href="https://www.linkedin.com/in/jake-darby-463358106/"
          >
            Jake Darby
          </Link>{" "}
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/theo-reeves-a13b77310/"
          >
            <BsLinkedin />
          </Link>
          <Link
            target="_blank"
            className="md:pr-8"
            href="https://www.linkedin.com/in/theo-reeves-a13b77310/"
          >
            Theo Reeves
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/richard-goodacre-727908317/"
          >
            <BsLinkedin />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/richard-goodacre-727908317/"
          >
            <Text> Richard Goodacre</Text>
          </Link>
        </Flex>
      </Card>
    </Container>
  );
}
