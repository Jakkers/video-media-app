"use client";

import {
  Button,
  Card,
  Flex,
  Heading,
  Text,
  DataList,
  Box,
  Container,
  Strong,
} from "@radix-ui/themes";

export default function PageReview(item) {
  "use client";
  if (item.has_spoiler) {
    return;
  } else {
    return (
      <>
        <Card>
          <Text>
            <Strong>{item.username}</Strong>
          </Text>
          <br />
          <Text>{item.review}</Text>
        </Card>
      </>
    );
  }
}
