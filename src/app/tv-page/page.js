import Header from "@/components/Header";
import BasicCarousel from "@/components/BasicCarousel";
import ShowCase from "@/components/ShowCase";

import { Container, Heading } from "@radix-ui/themes";
import { DisplayTvGenres } from "../../components/ShowTvGenres";

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
      <div className="fixed z-50 pt-2 min-[1245px]:top-3 min-[1245px]:right-40 max-[1244px]:right-0 pr-5 max-[615px]:right-5 max-[530px]:pr-24  min-[1220px]:pr-2 max-[1244px]: top-15  max-[616px]:top-12 max-[482px]:top-24 max-[482px]:right-60  max-[470px]:pr-30 max-[440px]:pr-0 max-[440px]:right-5 max-[341px]:top-20 max-[341px]:pt-4 max-[309px]:top-32 max-[616px]:pt-3 max-[309px]:pt-2 max-[616px]:pr-6 ">
        {/* <ShowTvGenresMenu title="Categories" /> */}
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
