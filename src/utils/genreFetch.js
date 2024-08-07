const apiKey = process.env.API_KEY;

export async function getGenres() {
  const genresRes = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`
  );
  const genresData = await genresRes.json();
  return genresData.genres;
}
