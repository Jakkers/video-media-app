import Link from "next/link";
import { dbConnect } from "@/utils/dbConnection";
import { Button, DropdownMenu } from "@radix-ui/themes";

const apiKey = process.env.API_KEY;

async function getTvGenres() {
  const genresTvRes = await fetch(
    `  https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en`
  );

  const genresTvData = await genresTvRes.json();

  return genresTvData;
}

export async function ShowTvGenresMenu({ title }) {
  const genresTvData = await getTvGenres();

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            {title}
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {genresTvData.genres.map((item, index) => (
            <DropdownMenu.Item key={index}>
              <Link href={`/tv-page#${item.name}`}>
                <p>{item.name}</p>
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}
