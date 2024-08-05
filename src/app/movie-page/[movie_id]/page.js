// import requests from "../../../utils/requestData";
const apiKey = process.env.API_KEY;
import Image from "next/image";
import { Button } from "@radix-ui/themes";
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

  console.log(video);
  // console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center ">
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
      <h1>{data.original_title}</h1>
      <h2>{data.overview}</h2>
      <Image
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        width={500}
        height={500}
        alt={`Poster for the ${data.original_title} film.`}
      />
      <Button>
        <Link href={data.homepage}>View film</Link>
      </Button>
    </main>
  );
}
