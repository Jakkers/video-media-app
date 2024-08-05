// import requests from "../../../utils/requestData";
const apiKey = process.env.API_KEY;

export default async function MoviePageId({ params }) {
  const response = await fetch(
    // `https://api.themoviedb.org/3/movie/${params.movie_id}?api_key=${apiKey}&language=en-US`
    ` https://api.themoviedb.org/3/movie/now_playing?${params.movie_id}&api_key=${apiKey}&language=en-US&page=1`
  );
  //We had to stringify the data, so we are parsing it back to json
  const data = await response.json();
  // const wrangledData = data.now_playing.results;

  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <h1>Single movie page</h1>
      <h1>{params.movie_id}</h1>

      {/* {movie.id.map((movie) => {
        return (
          <>
            <li>
              <h1>{movie.title}</h1>
              <h2>{movie.overview}</h2>
            </li>
          </>
        );
      })} */}
      {/* <h1>{data.title}</h1> */}
      {/* <h2>{data.overview}</h2> */}
    </main>
  );
}
