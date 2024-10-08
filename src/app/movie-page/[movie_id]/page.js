const apiKey = process.env.API_KEY;
import Image from "next/image";
import BasicCarousel from "@/components/BasicCarousel";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
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
import Link from "next/link";
import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import ToastDemo from "../../../components/Toast";
import LikeBtnM from "@/components/LikeM";
import DislikeBtnM from "@/components/DislikeM";
import DeleteBtnM from "@/components/DeleteReviewM";

//Metadata
export async function generateMetadata({ params }) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movie_id}?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response.json();

  return {
    title: `${data.title} Movie`,
    description: `${data.title}: ${data.overview}`,
  };
}

function spoilerCheck(item) {
  if (item.spoiler === true) {
    return (
      <>
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="item-1">
            {/* <Card> */}{" "}
            <Accordion.Header>
              <Strong>{item.username}</Strong>
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
    const movie_id = formData.get("movie_id");
    const spoiler = formData.get("spoiler");

    const db = dbConnect();
    await db.query(
      `INSERT INTO m_reviews (user_id, review, movie_id, spoiler) VALUES ($1,$2, $3, $4)`,
      [user_id, review, movie_id, spoiler]
    );
    await db.query(
      `UPDATE m_users
SET reviews_left = reviews_left + 1
WHERE clerk_id = $1`,
      [userId]
    );
    revalidatePath(`/movie-page/${params.movie_id}`);
    redirect(`/movie-page/${params.movie_id}`);
  }
  // conditionaly rendering the live and dislike buttons
  function likeCheck(item) {
    if (item.user_id != userId) {
      return (
        <div className="flex flex-row">
          <LikeBtnM id={item.id} likes={item.likes} params={params.movie_id} />
          <br></br>
          <Text className=" ml-2 mr-2">{item.likes}</Text>
          <br></br>
          <DislikeBtnM
            likes={item.likes}
            id={item.id}
            params={params.movie_id}
          />
        </div>
      );
    } else {
      return <></>;
    }
  }

  const db = dbConnect();
  const reviewData = (
    await db.query(
      `SELECT m_reviews.id, m_reviews.user_id, m_reviews.review, m_reviews.spoiler, m_reviews.likes, m_reviews.movie_id, m_users.username, m_users.clerk_id FROM m_reviews JOIN m_users ON m_reviews.user_id = m_users.clerk_id WHERE m_reviews.movie_id = ${params.movie_id} ORDER BY m_reviews.id ASC`
    )
  ).rows;

  return (
    <Container className="ml-2 mr-2" size="4">
      <Header />
      <div className="fixed z-50 pt-2 min-[1245px]:top-3 min-[1245px]:right-40 max-[1244px]:right-0 pr-5 max-[615px]:right-5 max-[530px]:pr-24  min-[1220px]:pr-2 max-[1244px]: top-15  max-[616px]:top-12 max-[470px]:top-24 max-[470px]:right-60  max-[470px]:pr-30 max-[440px]:pr-0 max-[440px]:right-5 max-[341px]:top-20 max-[341px]:pt-4 max-[309px]:top-32 max-[616px]:pt-3 max-[309px]:pt-2 max-[616px]:pr-6 "></div>
      <main>
        <div className="relative text-center">
          <div className="w-full absolute top-[0] sm:top-[50%] left-0 text-center mt-10">
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

          <Card>
            <iframe
              width="100%"
              className="h-[250px] sm:h-[350px] md:h-[650px]"
              height="650px"
              src={`https://www.youtube.com/embed/${video[0].key}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </Card>

          <br></br>
          <Heading>Similar films</Heading>
          <div>
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
            {reviewData.map((item) => (
              <Card key={item.id}>
                <Flex direction={"row"} gap={"3"} className="mb-2">
                  <Flex direction={"column"}>
                    <div key={item.id}>{spoilerCheck(item)}</div>
                  </Flex>
                </Flex>

                <Separator size={"4"} />

                <div className="flex flex-row justify-between mt-2">
                  {/* condittionally rendering like buttons  */}
                  <div key={item.id}>{likeCheck(item)}</div>

                  <div className="ml-4">
                    <DeleteBtnM
                      review={item.review}
                      user_id={item.user_id}
                      userId={userId}
                      params={item.movie_id}
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
