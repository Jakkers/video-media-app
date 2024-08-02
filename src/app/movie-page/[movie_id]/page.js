import requests from "../../../utils/requestData";
const apiKey = process.env.API_KEY;

export default async function MoviePage({ params }) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movie_id}?api_key=${apiKey}&language=en-US`
  );
  //We had to stringify the data, so we are parsing it back to json
  const data = await response.json();

  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Media App</h1>
      {/* {data.map(() => {})} */}
    </main>
  );
}
