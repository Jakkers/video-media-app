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
    // `https://api.themoviedb.org/3/movie/${params.movie_id}?api_key=${apiKey}&language=en-US`

    `https://api.themoviedb.org/3/movie/${params.movie_id}?api_key=${apiKey}&language=en-US&page=1`
  );
  //We had to stringify the data, so we are parsing it back to json
  const data = await response.json();
  // const wrangledData = data.now_playing.results;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movie_id}/videos?api_key=${apiKey}&language=en-US`
  );
  const video = (await res.json()).results;

  const similarRes = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movie_id}/similar?api_key=${apiKey}&language=en-US&page=1`
  );
  const similarData = await similarRes.json();

  async function addReview(formData) {
    "use server";
    const user_id = formData.get("user_id");
    const review = formData.get("review");
    const movie_id = formData.get("movie_id");
    const db = dbConnect();
    await db.query(
      `INSERT INTO m_reviews (user_id, review, movie_id) VALUES ($1,$2, $3)`,
      [user_id, review, movie_id]
    );
    revalidatePath(`/movie-page/${params.movie_id}`);
    redirect(`/movie-page/${params.movie_id}`);
  }

  const userData = await currentUser();
  const { userId } = auth();
  if (userId) {
    const db = dbConnect();
    await db.query(
      `
          SELECT * FROM social_users WHERE clerk_id = $1
            `,
      [userId]
    );
  }

  const db = dbConnect();
  const reviewData = (
    await db.query(
      `SELECT m_reviews.user_id, m_reviews.review, m_reviews.movie_id, m_users.username, m_users.clerk_id FROM m_reviews JOIN m_users ON m_reviews.user_id = m_users.clerk_id WHERE m_reviews.movie_id = ${params.movie_id}`
    )
  ).rows;

  return (
    <Container size="4">
      <Header />
      <main>
        <div className="relative text-center">
          <div className="w-full absolute top-[20%] md:top-[50%] left-0 text-center mt-10">
            <h1 className="z-10 text-3xl md:text-5xl font-bold text-center ">
              {data.title}
            </h1>
            <Text className="z-10 text-center ">{data.tagline}</Text>
            <br></br>
            <br></br>
            <Button>
              <Link href={data.homepage}>View film</Link>
            </Button>
          </div>
          <Image
            className="opacity-40 relative -z-10"
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
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
                <DataList.Label minWidth="88px">Release Date</DataList.Label>
                <DataList.Value minWidth="200px">
                  {data.release_date}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Runtime</DataList.Label>
                <DataList.Value minWidth="200px">{data.runtime}</DataList.Value>
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
          {/* <Image
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        width={500}
        height={500}
        alt={`Poster for the ${data.title} film.`}
      /> */}
          <Card>
            <iframe
              width="100%"
              height="650px"
              src={`https://www.youtube.com/embed/${video[0].key}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
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
          <Heading>Similar films</Heading>
          <div className="content-center">
            <BasicCarousel dataArray={similarData.results} />
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
            <input
              name="movie_id"
              className="text-white"
              defaultValue={params.movie_id}
              hidden
            />
            <label htmlFor="review">Review</label>
            <textarea
              name="review"
              type="text"
              placeholder="Your Review Here"
              id="review"
              className="text-white"
              maxlength="250"
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
