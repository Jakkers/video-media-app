const apiKey = process.env.API_KEY;

export async function fetchShowsByGenre(genreId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`
  );
  //! change for Tv API ^
  const data = await res.json();
  return data.results;
}

export async function fetchShowsForAllGenres(genres) {
  const promises = await genres.map((genre) => fetchShowsByGenre(genre.id));

  const showArray = await Promise.all(promises);
  return showArray;
}
