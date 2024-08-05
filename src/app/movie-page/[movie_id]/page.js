// import requests from "../../../utils/requestData";
const apiKey = process.env.API_KEY;
import Image from "next/image";
import {
  Button,
  Card,
  Flex,
  Heading,
  Text,
  DataList,
  Box,
} from "@radix-ui/themes";
import Link from "next/link";

export default async function MoviePageId({ params }) {
  const response = await fetch(
    // `https://api.themoviedb.org/3/movie/${params.movie_id}?api_key=${apiKey}&language=en-US`

    `https://api.themoviedb.org/3/movie/${params.movie_id}?api_key=${apiKey}&language=en-US&page=1`
  );
  //We had to stringify the data, so we are parsing it back to json
  const data = await response.json();
  // const wrangledData = data.now_playing.results;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movie_id}/videos?api_key=${apiKey}&language=en-US`
  );
  const video = (await res.json()).results;

  // console.log(video);

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="relative text-center">
        <div className="w-full absolute top-[50%] left-0 text-center mt-10">
          <h1 className="z-10 text-6xl font-bold text-center ">{data.title}</h1>
          <br></br>
          <Button>
            <Link href={data.homepage}>View film</Link>
          </Button>
        </div>
        <Image
          className="opacity-40 relative -z-10"
          src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
          width={1200}
          height={1000}
          alt={`backdrop for the ${data.original_title} film.`}
        />
      </div>
      {/* Adding datalist for the film  */}
      <Flex align="left">
        <Box>
          <DataList.Root
            orientation={{ initial: "vertical", sm: "horizontal" }}
          >
            <DataList.Item>
              <DataList.Label minWidth="88px">Release Date</DataList.Label>
              <DataList.Value minWidth="200px">
                {data.release_date}
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">Runtime</DataList.Label>
              <DataList.Value minWidth="200px">{data.runtime}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">
                Genre:{" "}
                {data.genres.map((item) => (
                  <DataList.Value key={item.id}>
                    {item.name} {", "}
                  </DataList.Value>
                ))}
              </DataList.Label>
              {/* I am trying to map multiple genres from the data  */}

              <DataList.Value>
                {data.genres.map((item) => (
                  <p key={item.id} className="pr-2">
                    {item.name}
                  </p>
                ))}
              </DataList.Value>

            </DataList.Item>
          </DataList.Root>
        </Box>
      </Flex>

      <Flex direction="column" className="p-6">
        <Heading>{data.title}</Heading>
        <Text>{data.overview}</Text>
      </Flex>
      {/* <Image
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        width={500}
        height={500}
        alt={`Poster for the ${data.title} film.`}
      /> */}
      <Card>
        <Heading>{data.title} Trailer</Heading>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${video[0].key}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </Card>
    </main>
  );
}
