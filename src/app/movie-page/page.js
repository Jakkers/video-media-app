import requests from "../../utils/requestData";

export default async function MoviePage() {
  const response = await fetch(requests.fetchGenres);
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
