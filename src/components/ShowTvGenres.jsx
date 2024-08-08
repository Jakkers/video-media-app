const apiKey = process.env.API_KEY;

import { Heading } from "@radix-ui/themes";
import BasicCarousel from "./BasicCarousel";
import { getTvGenres } from "../utils/gernesFetchTv";
import { fetchShowsForAllGenres } from "@/utils/fetchShowsByGenre";

export async function DisplayTvGenres() {
  let genresData = await getTvGenres();
  let dataArray = await fetchShowsForAllGenres(genresData);

  return (
    <>
      {dataArray.map((item, index) => (
        <div key={index} id={genresData[index].name}>
          {/* //? ^ this helps navigation with catergories menu as fetch function strips out name */}
          <br></br>
          <br></br>
          <Heading>{genresData[index].name}</Heading>
          {/* //?^need this included as fetch function strips out name*/}
          <BasicCarousel dataArray={item} format="tv" />
        </div>
      ))}
    </>
  );
}
