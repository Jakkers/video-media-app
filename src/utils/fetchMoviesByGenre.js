const apiKey = process.env.API_KEY;

export async function fetchMoviesByGenre(genreId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`
  );
  const data = await res.json();
  return data.results;
}

export async function fetchMoviesForAllGenres(genres) {
  const promises = await genres.map((genre) => fetchMoviesByGenre(genre.id));

  const moviesArray = await Promise.all(promises);
  return moviesArray;
}
