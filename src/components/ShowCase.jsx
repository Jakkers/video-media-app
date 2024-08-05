import Link from "next/link";
import Image from "next/image";
import "@radix-ui/themes/styles.css";
export default function BasicCarousel({ dataArray }) {
  const base_url = `https://image.tmdb.org/t/p/w500`;
  console.log("FACK5");
  console.log(dataArray);
  return (
    <div className="border-2 border-white flex flex-row overflow-auto w-[80vw]">
      {dataArray.map((item) => (
        <div key={item.id}>
          <Link href={`/movie-page/${item.id}`}>
            <Image
              src={`${base_url}${item.poster_path}`}
              alt={`Poster for the ${item.original_title} film.`}
              width={50}
              height={80}
            />
            {/* <p>{item.vote_average}</p>
            <h1>{item.title}</h1> */}
          </Link>
        </div>
      ))}
    </div>
  );
}
