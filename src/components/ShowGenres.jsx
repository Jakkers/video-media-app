import Link from "next/link";
import { dbConnect } from "@/utils/dbConnection";
const apiKey = process.env.API_KEY;

export async function ShowGenres(params) {
  const genresRes = await fetch(
    `  https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`
  );

  const genresData = await genresRes.json();
  // console.log("genresCheck");

  // console.log(genresData);

  return <>genre burp</>;
}
