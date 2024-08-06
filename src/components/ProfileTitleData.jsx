import { Container, Flex, Card, Heading, Text, Strong } from "@radix-ui/themes";
const apiKey = process.env.API_KEY;

export default async function TitleData({ TitleData }) {
  const response = await fetch(
    // `https://api.themoviedb.org/3/movie/${params.movie_id}?api_key=${apiKey}&language=en-US`

    `https://api.themoviedb.org/3/movie/${TitleData}?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response.json();
  console.log(TitleData);

  return <Strong>{data.title}</Strong>;
}
