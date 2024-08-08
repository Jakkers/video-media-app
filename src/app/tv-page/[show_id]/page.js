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
import { PageReview } from "@/components/PageReview";
import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import ToastDemo from "../../../components/Toast";
import { ShowTvGenresMenu } from "@/components/TvCategoriesMenu";
//Metadata
export async function generateMetadata({ params }) {
  const response = await fetch(
    // `https://api.themoviedb.org/3/movie/${params.show_id}?api_key=${apiKey}&language=en-US`

    `https://api.themoviedb.org/3/tv/${params.show_id}?api_key=${apiKey}&language=en-US&page=1`
  );
  //We had to stringify the data, so we are parsing it back to json
  const data = await response.json();

  return {
    title: `${data.name} TV show`,
    description: `${data.name}: ${data.overview}`,
  };
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

  const db = dbConnect();
  const reviewData = (
    await db.query(
      `SELECT s_reviews.user_id, s_reviews.review, s_reviews.show_id, m_users.username, m_users.clerk_id FROM s_reviews JOIN m_users ON s_reviews.user_id = m_users.clerk_id WHERE s_reviews.show_id = ${params.show_id}`
    )
  ).rows;

  //image variable
  let Backposter;
  if (data.poster_path) {
    Backposter = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  } else {
    Backposter = "/Fallback-image.jpg";
  }

  let Mainposter;
  if (data.backdrop_path) {
    Mainposter = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;
  } else {
    Mainposter = "/Main-Fallback-image.jpg";
    //! ^ Here please
  }

  return (
    <Container className="ml-2 mr-2" size="4">
      <Header />
      <div className="fixed z-50 pt-2 min-[1245px]:top-3 min-[1245px]:right-40 min-[1245px]:pl-5 max-[1244px]:right-0 pr-5 max-[615px]:right-5 max-[530px]:pr-24  min-[1220px]:pr-2 max-[1244px]: top-15  max-[616px]:top-12 max-[482px]:top-24 max-[482px]:right-60  max-[470px]:pr-30 max-[440px]:pr-0 max-[440px]:right-5 max-[341px]:top-20 max-[341px]:pt-4 max-[309px]:top-32 max-[616px]:pt-3 max-[309px]:pt-2 max-[616px]:pr-6 ">
        {/* <ShowTvGenresMenu title="Categories" /> */}
      </div>
      <main>
        <div className="relative text-center">
          <div className="w-full absolute top-[0] sm:top-[50%] left-0 text-center mt-10">
            <h1 className="z-10 text-3xl md:text-5xl font-bold text-center ">
              {data.name}
            </h1>
            {/* <Text className="z-10 text-center ">{data.tagline}</Text>
            <br></br>
            <br></br> */}
            {/* <Button>
              <Link href={data.homepage}>View film</Link>
            </Button> */}
          </div>
          <Image
            className="opacity-40 relative -z-10"
            src={Mainposter}
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
            src={Backposter}
            width={500}
            height={500}
            alt={`Poster for the ${data.title} film.`}
          />

          {/* <Card> */}
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
          {/* </Card> */}
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
            <input
              name="show_id"
              className="text-white"
              defaultValue={params.show_id}
              hidden
            />
            {/* <input name="reviews_left" defaultValue={1} hidden /> */}
            <label htmlFor="review" hidden>
              Review
            </label>
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
            <button type="submit">
              {" "}
              <ToastDemo />
            </button>
          </form>
          <br />
          <Flex direction={"column-reverse"} gap={"3"}>
            {reviewData.map((item) => (
              <div key={item.id}>
                <PageReview item={item} />
              </div>
            ))}
          </Flex>
        </Flex>
      </main>
    </Container>
  );
}
