import { Strong } from "@radix-ui/themes";
import Link from "next/link";
const apiKey = process.env.API_KEY;

export default async function TitleData({ TitleData }) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${TitleData}?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response.json();

  return (
    <>
      <Link href={`/movie-page/${data.id}`}>
        <Strong>{data.title}</Strong>
      </Link>
    </>
  );
}
