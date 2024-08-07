// import { Row } from "@radix-ui/themes/src/components/table.jsx";
import Link from "next/link";
// import Image from "next/image";
import Header from "@/components/Header";
import BasicCarousel from "@/components/BasicCarousel";
import ShowCase from "@/components/ShowCase";

import { DisplayGenres } from "../../components/ShowGenres";
import { ShowGenresMenu } from "@/components/CatergoriesMenu";
import { Container, Heading } from "@radix-ui/themes";
import ToastDemo from "../../components/Toast";

const apiKey = process.env.API_KEY;

export const metadata = {
  title: "Movies",
  description:
    "A selection of movies including featured, most popular and by genre",
};

export default async function MoviePage() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response.json();

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
      <div className="fixed top-30 left-15 z-50 pt-2  ">
        <ShowGenresMenu className="" />
      </div>
      <br></br>
      <main>
        {" "}
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
