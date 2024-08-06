import { Container, Flex, Card, Heading, Text, Strong } from "@radix-ui/themes";
import Image from "next/image";
const apiKey = process.env.API_KEY;

export default async function ImageData({ ImageData }) {
  const response = await fetch(
    // `https://api.themoviedb.org/3/movie/${params.movie_id}?api_key=${apiKey}&language=en-US`

    `https://api.themoviedb.org/3/movie/${ImageData}?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response.json();
  const base_url = `https://image.tmdb.org/t/p/w500`;

  // console.log(TitleData);

  return (
    <>
      <Image
        src={`${base_url}${data.poster_path}`}
        alt={`Poster for the ${data.original_title} film.`}
        width={100}
        height={100}
        className="p-[8px]"
      />
    </>
  );
}