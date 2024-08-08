import Link from "next/link";
import Image from "next/image";
import Style from "./basicCar.module.css";
export default function BasicCarousel({ dataArray, format }) {
  const base_url = `https://image.tmdb.org/t/p/w500`;

  function isPresent(item) {
    let Backposter = "/Fallback-image.jpg";
    if (item.poster_path) {
      return `${base_url}${item.poster_path}`;
    } else {
      return Backposter;
    }
  }

  function checkPoster(item) {
    if (!item.poster_path) {
      return (
        <div
          // id={Style.img_info}
          className=" text-white pointer-events-none
      z-10 p-6 absolute bottom-2 justify-center bg-transparent "
        >
          <div className="h-[100%] w-[100%]"></div>
          <div>
            <h1>{item.name || item.title}</h1>
            {/* //! this is to render name if a show OR a movie but is currently unproven */}
          </div>
        </div>
      );
    }
  }

  return (
    <div id={Style.main_box}>
      {dataArray.map((item) => (
        <div key={item.id} id={Style.imgs} className="relative">
          <Link href={`/${format}-page/${item.id}`}>
            <Image
              src={isPresent(item)}
              alt={`Poster for the ${item.original_title} film.`}
              width={150}
              height={80}
              id={Style.imgs}
              className="hover:p-[1px] hover:w-[104px] hover: h-[84px] hover:border-2 border-sky-500"
            />
            {checkPoster(item)}
            {/* //? this implements an overlay showing the name if no poster is avaiable */}
          </Link>
        </div>
      ))}
    </div>
    // </div>
  );
}
