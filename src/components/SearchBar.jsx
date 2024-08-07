const apiKey = process.env.API_KEY;

import { redirect } from "next/navigation";

import { FaSearch } from "react-icons/fa";

export default async function SearchBar() {
  async function handleSubmit(formData) {
    "use server";
    try {
      const searchQuery = formData.get("search-queries");
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}&language=en-US&page=1`
      );
      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${searchQuery}&api_key=${apiKey}&language=en-US&page=1`
      );
      const movieResults = (await movieResponse.json()).results;
      const tvResults = (await tvResponse.json()).results;
      //   movieResults, tvResults;
      //   setResults({
      //     movies: movieResults,
      //     tvShows: tvResults,
      //   });
      //   return tvResults, movieResults;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    const searchQuery = formData.get("search-queries");

    redirect(`/search-results/${searchQuery}`);
  }

  return (
    <>
      <form action={handleSubmit}>
        <label for="search-queries" aria-label="Search bar"></label>

        <input
          type="search"
          id="search-queries"
          name="search-queries"
          className="border-2 border-blue-400 mr-2 rounded-md"
        />

        <button aria-label="Search icon, press to search">
          <FaSearch />
        </button>
        {/* 
          <label for="browser">Search films</label>
          <input list="search-queries" name="browser" id="browser" />

          <datalist id="search-queries">
            <option value={data.title} />
          </datalist> */}
      </form>
    </>
  );
}
