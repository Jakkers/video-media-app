// import { Row } from "@radix-ui/themes/src/components/table.jsx";
import Link from "next/link";
// import Image from "next/image";
import Header from "@/components/Header";
import BasicCarousel from "@/components/BasicCarousel";
import ShowCase from "@/components/ShowCase";
import { Container } from "@radix-ui/themes";
import { ShowGenres } from "@/components/ShowGenres";
const apiKey = process.env.API_KEY;

export default async function MoviePage() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response.json();

  //! change
  const historyRes = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=history`
  );
  const historyData = await historyRes.json();

  const popularRes = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  const popularData = await popularRes.json();

  const comingSoonRes = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
  );
  const comingSoonData = await comingSoonRes.json();

  const topRes = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
  );
  const topData = await topRes.json();
  //We had to stringify the data, so we are parsing it back to json

  const base_url = `https://image.tmdb.org/t/p/w500`;

  return (
    <Container size="4">
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Media App</h1>
        <ShowCase dataArray={data.results} />
        Popular
        <BasicCarousel dataArray={popularData.results} />
        #Top rated
        <ShowCase dataArray={topData.results} />
        coming soon
        <BasicCarousel dataArray={comingSoonData.results} />
        history
        <ShowGenres />
        {/* <BasicCarousel dataArray={historyData.results} /> */}
      </main>
    </Container>
  );
}
