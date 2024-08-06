import Link from "next/link";
import Image from "next/image";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Style from "./showCase.module.css";
export default function ShowCase({ dataArray }) {
  const base_url = `https://image.tmdb.org/t/p/w500`;

  return (
    <div id={Style.main_box2}>
      {dataArray.map((item) => (
        <Theme key={item.id} id={Style.show_box}>
          <Link href={`/movie-page/${item.id}`}>
            {/* <section id={Style.show_box}> */}
            <Image
              src={`${base_url}${item.poster_path}`}
              alt={`Poster for the ${item.original_title} film.`}
              width={400}
              height={400}
              id={Style.imgs2}
              className="p-[8px]  "
            />
          </Link>
          <div
            id={Style.show_info}
            className="w-[50vw] text-center text-purple-500 bg-yellow-300 mr-[20px]"
          >
            <h1>{item.title}</h1>
            <p> Average Score:{item.vote_average}</p>
            <h3>{item.overview}</h3>
            <Link href={`/movie-page/${item.id}`}>
              <button className="bg-orange-400 border-white border-2 m-2 p-2">
                {" "}
                Watch trailer
              </button>
            </Link>
          </div>
          {/* </section> */}
          {/* <
              //!might want to put this data into a div and overlay on image? maybe just on hover?
               */}
        </Theme>
      ))}
    </div>
    // </div>
  );
}
