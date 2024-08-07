// import { Row } from "@radix-ui/themes/src/components/table.jsx";
import Link from "next/link";
// import Image from "next/image";
import Header from "@/components/Header";
import BasicCarousel from "@/components/BasicCarousel";
import ShowCase from "@/components/ShowCase";

import { DisplayGenres } from "../../components/ShowGenres";

import { Container, Heading } from "@radix-ui/themes";
import ToastDemo from "../../components/Toast";

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
    <Container className="ml-2 mr-2" size="4">
      <Header />
      <br></br>
      <main>
        {/* <Heading>Featured films</Heading> */}
        <br></br>
        <div>
          <ShowCase dataArray={data.results} format="movie" />
        </div>
        <br></br>
        <Heading>Popular</Heading>
        <br></br>
        <div>
          <BasicCarousel dataArray={popularData.results} format="movie" />
        </div>
        <br></br>
        <Heading>Top Rated</Heading>
        <br></br>
        <div>
          <BasicCarousel dataArray={topData.results} format="movie" />
        </div>
        <br></br>
        <Heading>Coming Soon</Heading>
        <br></br>
        <div>
          <BasicCarousel dataArray={comingSoonData.results} format="movie" />
        </div>
        <br></br>
        <DisplayGenres />
        {/* <BasicCarousel dataArray={historyData.results} /> */}
      </main>
    </Container>
  );
}
