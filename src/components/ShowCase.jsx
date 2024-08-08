import Link from "next/link";
import Image from "next/image";
import "@radix-ui/themes/styles.css";
import { Button, Container, Theme } from "@radix-ui/themes";
import Style from "./showCase.module.css";
export default function ShowCase({ dataArray, format }) {
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
    <Container size="4">
      <div id={Style.main_box2}>
        {dataArray.map((item) => (
          <Theme key={item.id} id={Style.show_box}>
            <Link href={`/${format}-page/${item.id}`}>
              <Image
                src={isPresent(item)}
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
              <h1 className="z-10 text-3xl font-bold md:text-5xl pb-2 md:pb-4">
                {item.title || item.name}
              </h1>

              <p className="pb-3 md:pb-4">{`Average Score: ${item.vote_average} / 10`}</p>

              <h3 className="pb-2 md:pb-5" id={Style.item_overview}>
                {item.overview}
              </h3>

              <Link href={`/${format}-page/${item.id}`}>
                <Button> Watch trailer</Button>
              </Link>
            </div>
          </Theme>
        ))}
      </div>
    </Container>
  );
}
