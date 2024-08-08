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
            {/* //!this inserts film data into a div and overlay on image with hover. may not iplement, but here incase helps accesibilty later?
            <div
              // id={Style.img_info}
              className=" text-transparent hover:text-white
              hover:border-2 border-purple-400 hover:bg-transparent z-10 absolute top-0 bg-transparent "
            >
              <div className="h-[213px] w-[154px]"></div>
              <div>
                <p>{item.vote_average}</p>
                {/*  */}
            {/* <h1>{item.title}</h1>
              </div>
            </div> */}
          </Link>
        </div>
      ))}
    </div>
    // </div>
  );
}
