const apiKey = process.env.API_KEY;
import { Card, Container, Flex, Heading, Text, Strong } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

export default async function SearchPage({ params }) {
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${params.id}&api_key=${apiKey}&language=en-US&page=1`
  );
  const tvResponse = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${params.id}&api_key=${apiKey}&language=en-US&page=1`
  );

  const movieResults = (await movieResponse.json()).results;
  const tvResults = (await tvResponse.json()).results;
  //   console.log(tvResults);
  //   movieResults, tvResults;
  //   setResults({
  //     movies: movieResults,
  //     tvShows: tvResults,
  //   });
  //   return tvResults, movieResults;
  //   console.log(movieResults);
  //   console.log(tvResults);
  const base_url = `https://image.tmdb.org/t/p/w500`;
  return (
    <>
      <Container className="ml-2 mr-2" size="4">
        <Header />
        <br></br>
        <Heading>Search Results</Heading>
        <br></br>
        <Flex direction={"row"} gap={"4"}>
          <Flex direction={"column"} gap={"3"}>
            <Heading>Movies</Heading>
            {movieResults.map((movies) => (
              <Link href={`/movie-page/${movies.id}`}>
                <Card key={movies.id}>
                  <Flex direction={"row"} gap={"3"}>
                    <div>
                      <Image
                        src={`${base_url}${movies.poster_path}`}
                        alt={`Poster for the ${movies.title} film.`}
                        width={100}
                        height={100}
                        className="rounded-[15px]"
                      />
                    </div>
                    <div className="pl-2 pt-2 flex flex-col w-fit h-fit">
                      <Strong>{movies.title}</Strong>
                      <Text>{movies.overview}</Text>
                    </div>
                  </Flex>
                </Card>
              </Link>
            ))}
          </Flex>

          <Flex direction={"column"} gap={"3"}>
            <Heading>TV Shows</Heading>
            {tvResults.map((tv) => (
              <Link href={`/tv-page/${tv.id}`}>
                <Card key={tv.id}>
                  <Flex direction={"row"} gap={"3"}>
                    <div>
                      <Image
                        src={`${base_url}${tv.poster_path}`}
                        alt={`Poster for the ${tv.title} film.`}
                        width={100}
                        height={100}
                        className="rounded-[15px]"
                      />
                    </div>
                    <div className="pl-2 pt-2 flex flex-col w-fit h-fit">
                      <Strong>{tv.name}</Strong>
                      <Text>{tv.overview}</Text>
                    </div>
                  </Flex>
                </Card>
              </Link>
            ))}
          </Flex>
        </Flex>
        <br></br>
      </Container>
    </>
  );
}
