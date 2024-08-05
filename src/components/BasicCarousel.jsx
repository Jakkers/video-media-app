import Link from "next/link";
import Image from "next/image";
import Style from "./basicCar.module.css";
export default function BasicCarousel({ dataArray }) {
  const base_url = `https://image.tmdb.org/t/p/w500`;
  // console.log("FACK4");
  // console.log(dataArray);
  return (
    <div id={Style.main_box}>
      {dataArray.map((item) => (
        <div key={item.id} id={Style.imgs}>
          <Link href={`/movie-page/${item.id}`}>
            <Image
              src={`${base_url}${item.poster_path}`}
              alt={`Poster for the ${item.original_title} film.`}
              width={100}
              height={80}
              id={Style.imgs}
              className="p-[8px] hover:p-[1px] hover:w-[104px] hover: h-[84px] hover:border-2 border-red-500 "
            />
            {/* <p>{item.vote_average}</p>
            //!might want to put this data into a div and overlay on image? maybe just on hover?
            <h1>{item.title}</h1> */}
          </Link>
        </div>
      ))}
    </div>
    // </div>
  );
}
