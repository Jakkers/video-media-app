const apiKey = process.env.API_KEY;




import Link from "next/link";
import { dbConnect } from "@/utils/dbConnection";
import { Button, DropdownMenu, Heading } from "@radix-ui/themes";

import BasicCarousel from "./BasicCarousel";
import { getGenres } from "@/utils/genreFetch";
import { fetchMoviesForAllGenres } from "@/utils/fetchMoviesByGenre";

export async function DisplayGenres() {
  let genresData = await getGenres();
  let dataArray = await fetchMoviesForAllGenres(genresData);

  return (
    <>
      {dataArray.map((item, index) => (
        <div key={index} id={genresData[index].name}>
          {/* //! ^ this helps navigation with catergories menu  */}
      

          {/* //? These are for styling, wil swap out later */}
          <br></br>
          <br></br>

          <Heading>{genresData[index].name}</Heading>

          {/* //!^need this form as fetch function strips out name */}
          <BasicCarousel dataArray={item} />
        </div>
      ))}
    </>
  );
}

export async function DoFetch() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53`
  );
  const data = await res.json();

}
