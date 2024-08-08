const apiKey = process.env.API_KEY;

import { Container, Heading } from "@radix-ui/themes";
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
          {/* //! ^ this helps navigation with catergories menu  */}
          <br></br>

          {/* //? These are for styling, wil swap out later */}

          <Heading>{genresData[index].name}</Heading>
          {/* //!^need this form as fetch function strips out name */}
          <BasicCarousel dataArray={item} format="tv" />
        </div>
      ))}
    </>
  );
}
