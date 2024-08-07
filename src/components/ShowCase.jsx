import Link from "next/link";
import Image from "next/image";
import "@radix-ui/themes/styles.css";
import { Button, Container, Theme } from "@radix-ui/themes";
import Style from "./showCase.module.css";
export default function ShowCase({ dataArray, format }) {
  const base_url = `https://image.tmdb.org/t/p/w500`;

  return (
    <Container size="4">
      <div id={Style.main_box2}>
        {dataArray.map((item) => (
          <Theme key={item.id} id={Style.show_box}>
            <Link href={`/${format}-page/${item.id}`}>
              {/* <section id={Style.show_box}> */}
              <Image
                src={`${base_url}${item.poster_path}`}
                alt={`Poster for the ${item.original_title} film.`}
                width={400}
                height={400}
                id={Style.imgs2}
              />
            </Link>
            <div
              id={Style.show_info}
              className="w-[70vw] xl:w-[50vw] text-center mr-[20px]"
            >
              <h1 className="z-10 text-3xl font-bold md:text-5xl">
                {item.title}
              </h1>
              <br></br>
              <p>{`Average Score: ${item.vote_average} / 10`}</p>
              <br></br>
              <h3 id={Style.item_overview}>{item.overview}</h3>
              <br></br>

              <Link href={`/{${format}-page/${item.id}`}>
                <Button> Watch trailer</Button>
              </Link>
            </div>
            {/* </section> */}
            {/* <
              //!might want to put this data into a div and overlay on image? maybe just on hover?
               */}
          </Theme>
        ))}
      </div>
    </Container>
  );
}

// <div className="relative text-center">
// <div className="w-full absolute top-[50%] left-0 text-center mt-10">
//   <h1 className="z-10 text-6xl font-bold text-center ">
//     {data.title}
//   </h1>
//   <Text className="z-10 text-center ">{data.tagline}</Text>
//   <br></br>
//   <br></br>
//   <Button>
//     <Link href={data.homepage}>View film</Link>
//   </Button>
// </div>
// <Image
//   className="opacity-40 relative -z-10"
//   src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
//   width={1200}
//   height={1000}
//   alt={`backdrop for the ${data.original_title} film.`}
// />
// </div>
