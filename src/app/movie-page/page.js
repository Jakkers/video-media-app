// import { Row } from "@radix-ui/themes/src/components/table.jsx";
import Link from "next/link";
// import Image from "next/image";
import Header from "@/components/Header";
import BasicCarousel from "@/components/BasicCarousel";
import ShowCase from "@/components/ShowCase";
import { Container, Heading } from "@radix-ui/themes";
const apiKey = process.env.API_KEY;

export default async function MoviePage() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  );
  //We had to stringify the data, so we are parsing it back to json
  const data = await response.json();
  const base_url = `https://image.tmdb.org/t/p/w500`;

  return (
    <Container size="4">
      <Header />
      <main className="flex min-h-screen flex-col justify-between p-24">
        <Heading>Featured films</Heading>
        <br></br>
        <div className="flex flex-col items-center ">
          <ShowCase dataArray={data.results} />
        </div>
        <br></br>
        <Heading>Top Films</Heading>
        <div className="flex flex-col items-center ">
          <BasicCarousel dataArray={data.results} />
        </div>
      </main>
    </Container>
  );
}
