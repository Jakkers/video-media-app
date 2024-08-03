const apiKey = process.env.API_KEY;

const requests = {
  fetchGenres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`,
  fetchNowPlaying: ` https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}language=en-US&page=1`,
};

export default requests;

console.log(requests);
