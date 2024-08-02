const apiKey = process.env.API_KEY;

const requests = {
  fetchGenres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`,
};

export default requests;

console.log(requests);
