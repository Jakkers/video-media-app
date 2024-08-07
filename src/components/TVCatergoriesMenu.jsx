import Link from "next/link";
import { dbConnect } from "@/utils/dbConnection";
import { Button, DropdownMenu } from "@radix-ui/themes";

const apiKey = process.env.API_KEY;

async function getTvGenres() {
  const genresTvRes = await fetch(
    `  https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`
  );
  //! change ^
  const genresTvData = await genresRes.json();

  return genresTvData;
}

export async function ShowTvGenresMenu(params) {
  const genresTvData = await getTvGenres();

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            Tv Categories
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {genresTvData.genres.map((item, index) => (
            <DropdownMenu.Item key={index}>
              <Link href={`/show-page#${item.name}`}>
                {/* //! ^ might need a change */}
                <p>{item.name}</p>
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}
