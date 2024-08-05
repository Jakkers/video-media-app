// import { Row } from "@radix-ui/themes/src/components/table.jsx";
import Link from "next/link";
const apiKey = process.env.API_KEY;
import Image from "next/image";

export default async function MoviePage() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  );
  //We had to stringify the data, so we are parsing it back to json
  const data = await response.json();
  const base_url = `https://image.tmdb.org/t/p/w500`;

  //   console.log(data.results);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Media App</h1>
      <ol className="text-white">
        {data.results.map((item) => {
          return (
            <li key={item.id}>
              <Link href={`/movie-page/${item.id}`}>
                <h1>{item.title}</h1>
                <Image
                  src={`${base_url}${item.poster_path}`}
                  alt={item.title}
                  width={500}
                  height={500}
                />
                <p>{item.vote_average}</p>
              </Link>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
