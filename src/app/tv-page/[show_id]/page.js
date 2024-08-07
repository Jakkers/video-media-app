const apiKey = process.env.API_KEY;
import Image from "next/image";
import BasicCarousel from "@/components/BasicCarousel";
import {
  Button,
  Card,
  Flex,
  Heading,
  Text,
  DataList,
  Box,
  Container,
  Strong,
} from "@radix-ui/themes";
import Header from "@/components/Header";
import Link from "next/link";
import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function MoviePageId({ params }) {
  const response = await fetch(
    // `https://api.themoviedb.org/3/movie/${params.show_id}?api_key=${apiKey}&language=en-US`

    `https://api.themoviedb.org/3/tv/${params.show_id}?api_key=${apiKey}&language=en-US&page=1`
  );
  //We had to stringify the data, so we are parsing it back to json
  const data = await response.json();


  let similarRes = await fetch(
    `https://api.themoviedb.org/3/tv/${params.show_id}/similar?api_key=${apiKey}&language=en-US&page=2`
  );
  let similarData = await similarRes.json();

  if (similarData.results.length === 0) {
    similarRes = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
    );
    similarData = await similarRes.json();
  }

  const userData = await currentUser();
  const { userId } = auth();
  if (userId) {
    const db = dbConnect();
    await db.query(
      `
          SELECT * FROM m_users WHERE clerk_id = $1
            `,
      [userId]
    );
  }

  async function addReview(formData) {
    "use server";
    const user_id = formData.get("user_id");
    const review = formData.get("review");
    const show_id = formData.get("show_id");

    const db = dbConnect();
    await db.query(
      `INSERT INTO s_reviews (user_id, review, show_id) VALUES ($1,$2, $3)`,
      [user_id, review, show_id]
    );
    await db.query(
      `UPDATE m_users
  SET reviews_left = reviews_left + 1
  WHERE clerk_id = $1`,
      [userId]
    );
    revalidatePath(`/tv-page/${params.show_id}`);
    redirect(`/tv-page/${params.show_id}`);
  }

  const db = dbConnect();
  const reviewData = (
    await db.query(
      `SELECT s_reviews.user_id, s_reviews.review, s_reviews.show_id, m_users.username, m_users.clerk_id FROM s_reviews JOIN m_users ON s_reviews.user_id = m_users.clerk_id WHERE s_reviews.show_id = ${params.show_id}`
    )
  ).rows;

  return (
    <Container className="ml-2 mr-2" size="4">
      <Header />
      <main>
        <div className="relative text-center">
          <div className="w-full absolute top-[0] sm:top-[50%] left-0 text-center mt-10">
            <h1 className="z-10 text-3xl md:text-5xl font-bold text-center ">
              {data.title}
            </h1>
            <Text className="z-10 text-center ">{data.tagline}</Text>
            <br></br>
            <br></br>
            {/* <Button>
              <Link href={data.homepage}>View film</Link>
            </Button> */}
          </div>
          <Heading>{data.name}</Heading>
          <Image
            className="opacity-40 relative -z-10"
            src={`https://image.tmdb.org/t/p/original${
              data.backdrop_path || data.poster_path
            }`}
            width={1200}
            height={1000}
            alt={`backdrop for the ${data.original_title} film.`}
          />
        </div>
        {/* Adding datalist for the film  */}
        <Flex direction="column" className="p-6">
          <Box>
            <DataList.Root
              orientation={{ initial: "vertical", sm: "horizontal" }}
            >
              <DataList.Item>
                <DataList.Label minWidth="88px">Series:</DataList.Label>
                <DataList.Value minWidth="200px">
                  {data.number_of_seasons}
                </DataList.Value>
              </DataList.Item>{" "}
              <DataList.Item>
                <DataList.Label minWidth="88px">First Aired:</DataList.Label>
                <DataList.Value minWidth="200px">
                  {data.first_air_date}
                </DataList.Value>
                <DataList.Label minWidth="88px">Last Aired:</DataList.Label>
                <DataList.Value minWidth="200px">
                  {data.last_air_date}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Genres</DataList.Label>
                {/* I am trying to map multiple genres from the data  */}
                <DataList.Value>
                  {data.genres.map((item) => (
                    <p key={item.id} className="pr-2">
                      {item.name}
                    </p>
                  ))}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Shown on:</DataList.Label>
                <DataList.Value minWidth="200px">
                  {data.networks.map((item) => (
                    <p key={item.id} className="pr-2">
                      {item.name}
                    </p>
                  ))}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Total Episodes:</DataList.Label>
                <DataList.Value minWidth="200px">
                  {data.number_of_episodes}
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Box>
          <Box>
            <br></br>
            <Heading>{data.title}</Heading>
            <br></br>
            <Text>{data.overview}</Text>
            <br></br>
            <br></br>
          </Box>
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            width={500}
            height={500}
            alt={`Poster for the ${data.title} film.`}
          />
          <Card>
            {/* <iframe
              width="100%"
              height="650px"
              src={`https://www.youtube.com/embed/${video[0].key}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe> */}
          </Card>
          {/* {data.production_companies.map((item) => (

        <div
          className="bg-white w-[100%] h-[100px] flex flex-row"
          key={item.id}
        >
          <div className="justify-around">
            <Image
              src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
              alt="Image 1"
              width={100}
              height={100}
            />
          </div>
        </div>
      ))} */}

          <br></br>
          <Heading>Similar </Heading>
          <div>
            <BasicCarousel dataArray={similarData.results} format="tv" />
          </div>
          <br></br>
          <Heading>Leave a review</Heading>
          <br></br>
          <form action={addReview} className="flex flex-col gap-2">
            <input
              name="user_id"
              className="text-black"
              defaultValue={userData.id}
              hidden
            />
            <input name="" />
            <input
              name="show_id"
              className="text-white"
              defaultValue={params.show_id}
              hidden
            />
            {/* <input name="reviews_left" defaultValue={1} hidden /> */}
            <label htmlFor="review">Review</label>
            <textarea
              name="review"
              type="text"
              placeholder="Your Review Here"
              id="review"
              className="text-white"
              maxLength="250"
              rows="3"
              required
            />
            <button
              type="submit"
              className="flex hover:bg-blue-500 h-8 hover:text-white bg-white rounded text-black items-center text-center

             w-32 p-1 justify-center text-base"
            >
              Submit
            </button>
          </form>
          <br />
          <Flex direction={"column-reverse"} gap={"3"}>
            {reviewData.map((item) => (
              <Card key={item.id}>
                <Text>
                  <Strong>{item.username}</Strong>
                </Text>
                <br />
                <Text>{item.review}</Text>
              </Card>
            ))}
          </Flex>
        </Flex>
      </main>
    </Container>
  );
}