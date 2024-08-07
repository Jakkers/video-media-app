import Header from "@/components/Header";
import BasicCarousel from "@/components/BasicCarousel";
import ShowCase from "@/components/ShowCase";

import { DisplayGenres } from "../../components/ShowGenres";

import { Container, Heading } from "@radix-ui/themes";
import { DisplayTvGenres } from "../../components/ShowTvGenres";
import { ShowTvGenresMenu } from "../../components/TVCatergoriesMenu";

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
    <>
      {" "}
      <Heading>Popular </Heading>
      <ShowCase dataArray={popularData.results} format="tv" />{" "}
      <Heading>On Air </Heading>
      <BasicCarousel dataArray={airingData.results} format="tv" />
      <Heading>Top Rated </Heading>
      <ShowCase dataArray={data.results} format="tv" />
      <DisplayTvGenres />
    </>
  );
}
