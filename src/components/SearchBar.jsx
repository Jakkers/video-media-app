const apiKey = process.env.API_KEY;

import { redirect } from "next/navigation";

import { FaSearch } from "react-icons/fa";

export default async function SearchBar() {
  async function handleSubmit(formData) {
    "use server";
    const searchQuery = formData.get("search-queries");
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}&language=en-US&page=1`
    );
    // const res = await fetch(
    //   `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    const searchData = (await response.json()).results;

    // console.log(searchQuery);
    // console.log(searchData[0].id);
    redirect(`/movie-page/${searchData[0].id}`);

    // const data = await res.json();
  }

  return (
    <>
      <form action={handleSubmit}>
        <label for="search-queries"></label>

        <input
          type="search"
          id="search-queries"
          name="search-queries"
          className="border-2 border-blue-400 mr-2 rounded-md"
        />

        <button>
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
