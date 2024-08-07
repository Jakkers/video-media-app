const apiKey = process.env.API_KEY;

export async function getTvGenres() {
  const genresRes = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en`
  );
  // !^ change for TV
  const genresTvData = await genresRes.json();
  return genresTvData.genres;
}
