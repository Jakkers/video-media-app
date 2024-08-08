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
      <div className="fixed z-50 pt-2 min-[1245px]:top-3 min-[1245px]:right-40 max-[1244px]:right-0 pr-5 max-[615px]:right-5 max-[530px]:pr-24  min-[1220px]:pr-2 max-[1244px]: top-15  max-[616px]:top-12 max-[470px]:top-24 max-[470px]:right-60  max-[470px]:pr-30 max-[440px]:pr-0 max-[440px]:right-5 max-[341px]:top-20 max-[341px]:pt-4 max-[309px]:top-32 max-[616px]:pt-3 max-[309px]:pt-2 max-[616px]:pr-6 ">
        {/* <ShowGenresMenu /> */}
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
        <DisplayGenres />
        {/* <BasicCarousel dataArray={historyData.results} /> */}
      </main>
    </Container>
  );
}
