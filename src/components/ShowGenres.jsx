import Link from "next/link";
import { dbConnect } from "@/utils/dbConnection";
import { Button, DropdownMenu } from "@radix-ui/themes";
import BasicCarousel from "./BasicCarousel";
const apiKey = process.env.API_KEY;

async function getGenres() {
  const genresRes = await fetch(
    `  https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`
  );

  const genresData = await genresRes.json();

  return genresData;
}

// const getWithPromiseAll = async (array) => {

//  async function thisFetch(){

//   );
//   console.timeEnd("promise all");
//   return data;
// };

// export async function DoubleGet() {
//   const genresData =  getGenres();
//   genresData.map((genre) => {
//     let res = await fetch(
//       `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre.id}`
//     );
//   })
//   const dataArray = getWithPromiseAll(genresData);
//   console.log("lookadataArray");

//   console.log(dataArray);
// }
// export async function BuildGenresArray(array) {
//   const genresData = getGenres();

//   const dataArray = getWithPromiseAll(genresData);
//   console.log(dataArray);
// }

// const genresData = getGenres();
// export async function DoFetch() {
//   let genresArray;

//   const res = await fetch(
//     `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53`
//   );

//   const data = await res.json();
//   console.log("lookhere");
//   console.log(data);
// }

// array.forEach((genre)=>(
// let res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre.name}`);))

// }

export async function ShowGenresMenu(params) {
  const genresData = await getGenres();
  console.log("showME");

  console.log(genresData.genres);
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

// export async function displayCategories() {}
// console.log(genresData);
// genresData.map((item, index) => {
//   `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genre=${definedGenre}&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
// });

//   { id: 28, name: 'Action' },
//   { id: 12, name: 'Adventure' },
//   { id: 16, name: 'Animation' },
//   { id: 35, name: 'Comedy' },
//   { id: 80, name: 'Crime' },
//   { id: 99, name: 'Documentary' },
//   { id: 18, name: 'Drama' },
//   { id: 10751, name: 'Family' },
//   { id: 14, name: 'Fantasy' },
//   { id: 36, name: 'History' },
//   { id: 27, name: 'Horror' },
//   { id: 10402, name: 'Music' },
//   { id: 9648, name: 'Mystery' },
//   { id: 10749, name: 'Romance' },
//   { id: 878, name: 'Science Fiction' },
//   { id: 10770, name: 'TV Movie' },
//   { id: 53, name: 'Thriller' },
//   { id: 10752, name: 'War' },
//   { id: 37, name: 'Western' }
// ]
