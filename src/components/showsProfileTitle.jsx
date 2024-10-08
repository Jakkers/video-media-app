import { Strong } from "@radix-ui/themes";
import Link from "next/link";
const apiKey = process.env.API_KEY;

export default async function ShowTitleData({ ShowTitleData }) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${ShowTitleData}?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response.json();

  return (
    <>
      <Link href={`/tv-page/${data.id}`}>
        <Strong>{data.name}</Strong>
      </Link>
    </>
  );
}
