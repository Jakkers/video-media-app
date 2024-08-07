import Link from "next/link";
import { dbConnect } from "@/utils/dbConnection";
import { Button, DropdownMenu } from "@radix-ui/themes";

const apiKey = process.env.API_KEY;

async function getGenres() {
  const genresRes = await fetch(
    `  https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`
  );

  const genresData = await genresRes.json();

  return genresData;
}

export async function ShowGenresMenu(params) {
  const genresData = await getGenres();
  // console.log("showME");

  // console.log(genresData.genres);
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            Categories
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {genresData.genres.map((item, index) => (
            <DropdownMenu.Item key={index}>
              <Link href={`#${item.name}`}>
                <p>{item.name}</p>
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}
