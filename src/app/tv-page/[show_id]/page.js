const apiKey = process.env.API_KEY;
import Image from "next/image";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
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
  Separator,
} from "@radix-ui/themes";
import Header from "@/components/Header";
import { PageReviewCard } from "@/components/PageReview";
import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import ToastDemo from "../../../components/Toast";
import { ShowTvGenresMenu } from "@/components/TvCategoriesMenu";
import LiBtnS from "@/components/LikeS";
import DeleteBtnS from "@/components/DeleteReviewS";
import DisBtnS from "@/components/DislikeS";
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

function spoilerCheck(item) {
  if (item.spoiler === true) {
    return (
      <>
        {" "}
        <Text>
          <Strong></Strong>
        </Text>
        <br></br>{" "}
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="item-1">
            {/* <Card> */}{" "}
            <Accordion.Header>
              {item.username}
              <br></br>
              <Accordion.Trigger className="AccordionTrigger">
                Warning Spoilers{" "}
                <ChevronDownIcon className="AccordionChevron" aria-hidden />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Text>{item.review}</Text>
            </Accordion.Content>{" "}
            {/* </Card> */}
          </Accordion.Item>
        </Accordion.Root>
      </>
    );
  } else {
    return (
      <>
        {/* <Card> */}
        <Text>
          <Strong>{item.username}</Strong>
        </Text>
        <br />
        <Text>{item.review}</Text>
        {/* </Card> */}
      </>
    );
  }
}

export default async function MoviePageId({ params }) {
  async function addReview(formData) {
    "use server";
    const user_id = formData.get("user_id");
    const review = formData.get("review");
    const show_id = formData.get("show_id");

    const spoiler = formData.get("spoiler");

    const db = dbConnect();
    await db.query(
      `INSERT INTO s_reviews (user_id, review, show_id, spoiler) VALUES ($1,$2, $3, $4)`,
      [user_id, review, show_id, spoiler]
    );
    await db.query(
      `UPDATE m_users
SET reviews_left = reviews_left + 1
WHERE clerk_id = $1`,
      [user_id]
    );
    revalidatePath(`/tv-page/${params.show_id}`);
    redirect(`/tv-page/${params.show_id}`);
  }

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
      `SELECT s_reviews.user_id, s_reviews.review, s_reviews.likes, s_reviews.show_id, m_users.username, m_users.clerk_id FROM s_reviews JOIN m_users ON s_reviews.user_id = m_users.clerk_id WHERE s_reviews.show_id = ${params.show_id} ORDER BY s_reviews.id ASC`
    )
  ).rows;

  const reviewDataS = (
    await db.query(
      `SELECT * FROM m_reviews WHERE user_id = $1 ORDER BY id ASC`,
      [userId]
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
    Mainposter = "/backdrop-fallback.jpg";
    //! ^ Here please
  }

  return (
    <Container className="ml-2 mr-2" size="4">
      <Header />
      {/* <div className="fixed z-50 pt-2 min-[1245px]:top-3 min-[1245px]:right-40 min-[1245px]:pl-5 max-[1244px]:right-0 pr-5 max-[615px]:right-5 max-[530px]:pr-24  min-[1220px]:pr-2 max-[1244px]: top-15  max-[616px]:top-12 max-[482px]:top-24 max-[482px]:right-60  max-[470px]:pr-30 max-[440px]:pr-0 max-[440px]:right-5 max-[341px]:top-20 max-[341px]:pt-4 max-[309px]:top-32 max-[616px]:pt-3 max-[309px]:pt-2 max-[616px]:pr-6 "> */}
      {/* <ShowTvGenresMenu title="Categories" /> */}
      {/* </div> */}
      <main>
        <div className="relative text-center">
          <div className="w-full absolute top-[20%] sm:top-[50%] left-0 text-center mt-10">
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
            <Heading>{data.name}</Heading>
            <br></br>
            <Text>{data.overview}</Text>
            <br></br>
            <br></br>
          </Box>
          <br></br>
          <Heading>Similar TV shows</Heading>
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
            <label htmlFor="spoiler">Includes Spoiler?</label>
            <input
              className="h-5 w-5"
              name="spoiler"
              id="spoiler"
              type="checkbox"
            />
            <br></br>
            <button type="submit">
              {" "}
              <ToastDemo />
            </button>
          </form>
          <br />
          <Flex direction={"column-reverse"} gap={"3"}>
            {/* {reviewData.map((item) => (
              <div key={item.id}>
                <Card>
                  <Text>
                    <Strong>{item.username}</Strong>
                  </Text>
                  <br />
                  <Text>{item.review}</Text>
                </Card>
              </div>
            ))} */}
            {reviewData.map((item) => (
              <Card key={item.id}>
                <Flex direction={"row"} gap={"3"} className="mb-2">
                  {/* <div className="flex flex-shrink-0">
                  <ImageData ImageData={item.movie_id} />
                </div> */}
                  <Flex direction={"column"}>
                    <Text>
                      {/* <TitleData TitleData={item.movie_id} /> */}
                      {/* <Strong>{item.username}</Strong> */}
                    </Text>
                    <div key={item.id}>
                      {spoilerCheck(item)}

                      {/* <Text>{item.review}</Text> */}
                    </div>
                  </Flex>
                </Flex>

                <Separator size={"4"} />

                <div className="flex flex-row justify-between mt-2">
                  {/* <div className="flex flex-row">
                    <LiBtnS
                      id={item.id}
                      likes={item.likes}
                      // userId={item.user_id}
                      revId={item.show_id}
                    />
                    <br></br>
                    <Text className=" ml-2 mr-2">{item.likes}</Text>
                    <br></br>
                    <DisBtnS
                      // userId={item.user_id}
                      likes={item.likes}
                      id={item.id}
                      revId={item.id}
                    />
                  </div> */}
                  <div className="ml-4">
                    <DeleteBtnS
                      review={item.review}
                      userId={item.user_id}
                      del={item.show_id}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </Flex>
        </Flex>
      </main>
    </Container>
  );
}
