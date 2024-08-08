import { Card, Text, Strong } from "@radix-ui/themes";

export default function PageReviewCard(item) {
  console.log("secondProof");
  return (
    <>
      {" "}
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
