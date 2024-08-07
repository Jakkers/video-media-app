import Header from "@/components/Header";
import BasicCarousel from "@/components/BasicCarousel";
import ShowCase from "@/components/ShowCase";

import { DisplayGenres } from "../../components/ShowGenres";

import { Container, Heading } from "@radix-ui/themes";
import { DisplayTvGenres } from "../../components/ShowTvGenres";
import { ShowTvGenresMenu } from "@/components/TvCategoriesMenu";

export const metadata = {
  title: "TV Shows",
  description:
    "A selection of TV shows including featured, most popular and by genre",
};

export default async function TelevisonPage() {
  const apiKey = process.env.API_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response.json();

  const popularResponse = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  const popularData = await popularResponse.json();

  const airingResponse = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  const airingData = await airingResponse.json();

  return (
    <Container className="ml-2 mr-2" size="4">
      <Header />
      <div className="fixed top-30 left-15 z-50 pt-2  ">
        <ShowTvGenresMenu />
      </div>
      <br></br>
      <ShowCase dataArray={popularData.results} format="tv" /> <br></br>
      <Heading>On Air </Heading>
      <BasicCarousel dataArray={airingData.results} format="tv" />
      <br></br>
      <Heading>Top Rated </Heading>
      <br></br>
      <BasicCarousel dataArray={data.results} format="tv" />
      <DisplayTvGenres />
    </Container>
  );
}
