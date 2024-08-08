import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Header from "@/components/Header";
import {
  Container,
  Flex,
  Card,
  Heading,
  Text,
  Strong,
  Separator,
} from "@radix-ui/themes";
import TitleData from "@/components/ProfileTitleData";
import ImageData from "@/components/ProfileImgReviews";
import Image from "next/image";
import ShowImage from "@/components/showsProfileimg";
import ShowTitleData from "@/components/showsProfileTitle";
import DeleteBtnM from "@/components/DeleteReviewM";
import DeleteBtnS from "@/components/DeleteReviewS";
import LikeBtnM from "@/components/LikeM";
import DislikeBtnM from "@/components/DislikeM";
import LiBtnS from "@/components/LikeS";
import DisBtnS from "@/components/DislikeS";

//? react icons
import { GiCosmicEgg } from "react-icons/gi";
import { MdEgg } from "react-icons/md";
import { GiEggEye } from "react-icons/gi";

//Metadata
export async function generateMetadata() {
  const { userId } = auth();
  if (userId) {
    const db = dbConnect();
    const usersData = (
      await db.query(`SELECT * FROM m_users WHERE clerk_id = $1`, [userId])
    ).rows;

    return {
      title: `${usersData[0]?.username} Profile Page`,
      description: `A place to see ${usersData[0]?.username} bio, acheivements and reviews`,
    };
  }
}

export default async function UserIdPage({ params }) {
  const userData = await currentUser();
  const { userId } = auth();
  if (userId) {
    const db = dbConnect();
    await db.query(`SELECT * FROM m_users WHERE clerk_id = $1`, [userId]);
  }

  async function handleSubmit(formData) {
    "use server";
    const clerk_id = formData.get("clerk_id");
    const username = formData.get("username");
    const bio = formData.get("bio");
    const db = dbConnect();
    await db.query(
      `INSERT INTO m_users (clerk_id, username, bio) VALUES ($1, $2, $3)`,
      [clerk_id, username, bio]
    );
    revalidatePath(`/user/${userId}`);
    redirect(`/user/${userId}`);
  }

  async function userBio() {
    const db = dbConnect();
    const bio = (
      await db.query(`SELECT * FROM m_users WHERE clerk_id = $1 `, [userId])
    ).rows;
    return bio;
  }

  const Bio = await userBio();
  const db = dbConnect();
  const usersData = (
    await db.query(`SELECT * FROM m_users WHERE clerk_id = $1`, [userId])
  ).rows;

  const reviewData = (
    await db.query(
      `SELECT * FROM m_reviews WHERE user_id = $1 ORDER BY id ASC`,
      [userId]
    )
  ).rows;

  const showData = (
    await db.query(
      `SELECT * FROM s_reviews WHERE user_id = $1 ORDER BY id ASC`,
      [userId]
    )
  ).rows;

  const reviewBadge = usersData[0].reviews_left;

  // console.log(reviewBadge);

  if (usersData.length > 0) {
    return (
      <Container className="ml-2 mr-2" size="4">
        <Header />
        <br></br>
        <Heading size={"8"}>
          <Strong>{usersData[0]?.username} Profile</Strong>
        </Heading>
        <br></br>
        <div id="profile-info">
          {Bio.map((item) => (
            <div key={item.id}>
              <Text type="p">Bio: {item.bio}</Text>
            </div>
          ))}
        </div>
        <br></br>
        {/* <div>
          {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in.</h1>}
        </div>
      );
    } */}

        {/* <button onClick={() => reset()}>Reset</button> */}

        {/* Achievements  */}
        {/* Achievements  */}

        <Heading>Achievements</Heading>
        <br></br>
        <Flex gap={"1"}>
          {reviewBadge >= 1 ? (
            <Card className="m-0 p-0">
              <Text
                size={"9"}
                className="flex flex-col text-orange-400 items-center "
              >
                <MdEgg />
                <Text size={"2"}>Getting Started</Text>
              </Text>
            </Card>
          ) : null}
          {reviewBadge >= 5 ? (
            <Card>
              {" "}
              <Text
                size={"9"}
                className="flex flex-col text-gray-400 items-center "
              >
                <GiEggEye />
                <Text size={"2"}>Your Hatching</Text>
              </Text>
            </Card>
          ) : null}
          {reviewBadge >= 10 ? (
            <Card>
              <Text
                size={"9"}
                className="flex flex-col text-yellow-400 items-center "
              >
                <GiCosmicEgg />
              </Text>
              <Text size={"2"}>you&apos;ve got our attention</Text>
            </Card>
          ) : null}
        </Flex>
        {/* Movie Reviews  */}
        <br></br>
        <Flex direction={"column-reverse"} gap={"3"}>
          {reviewData.map((item) => (
            <Card key={item.id}>
              <Flex direction={"row"} gap={"3"} className="mb-2">
                <div className="flex flex-shrink-0">
                  <ImageData ImageData={item.movie_id} />
                </div>
                <Flex direction={"column"}>
                  <Text>
                    <TitleData TitleData={item.movie_id} />
                  </Text>
                  <Text>{item.review}</Text>
                </Flex>
              </Flex>

              <Separator size={"4"} />

              <div className="flex flex-row justify-between mt-2">
                <div className="flex flex-row">
                  <LikeBtnM
                    id={item.id}
                    likes={item.likes}
                    userId={item.user_id}
                  />
                  <br></br>
                  <Text className=" ml-2 mr-2">{item.likes}</Text>
                  <br></br>
                  <DislikeBtnM
                    userId={item.user_id}
                    likes={item.likes}
                    id={item.id}
                  />
                </div>
                <div className="ml-4">
                  <DeleteBtnM review={item.review} userId={item.user_id} />
                </div>
              </div>
            </Card>
          ))}
          {/* <br></br> */}
          <Heading>Your Movie Reviews</Heading>
        </Flex>

        {/* Tv Reviews  */}
        {/* Tv Reviews  */}
        <br></br>
        <Flex direction={"column-reverse"} gap={"3"}>
          {showData.map((item) => (
            <Card key={item.id}>
              <Flex direction={"row"} gap={"3"}>
                <div>
                  <ShowImage ImageData={item.show_id} />
                </div>
                <div className="pl-2 pt-2 flex flex-col w-fit h-fit">
                  <Text>
                    <ShowTitleData ShowTitleData={item.show_id} />
                  </Text>
                  <Text>{item.review}</Text>
                  {/* <div className="flex flex-row">
                    <LiBtnS
                      id={item.id}
                      likes={item.likes}
                      userId={item.user_id}
                    />
                    <br></br>
                    <Text className=" ml-1 mr-1">{item.likes}</Text>
                    <br></br>
                    <DisBtnS
                      userId={item.user_id}
                      likes={item.likes}
                      id={item.id}
                    />
                  </div>
                  <div className="w-6 pt-2">
                    <DeleteBtnS review={item.review} userId={item.user_id} />
                  </div> */}
                </div>
              </Flex>
            </Card>
          ))}
          {/* <br></br> */}
          <Heading>Your Tv Reviews</Heading>
        </Flex>
      </Container>
    );
  } else {
    return (
      <Container size="4">
        <Header />
        <br></br>
        <Heading>Create your profile</Heading>
        <br></br>
        <form
          action={handleSubmit}
          className="flex flex-col items-center mt-10"
        >
          <input name="clerk_id" defaultValue={userData.id} hidden></input>
          <label htmlFor="username">Enter a username:</label>
          <input
            className="text-black"
            name="username"
            placeholder="Enter your username"
            required
          />
          <label htmlFor="bio">Enter your bio</label>
          <textarea
            className="resize text-black"
            name="bio"
            required
            placeholder="Write your bio here!"
          />
          <button
            type="submit"
            className="flex bg-white rounded text-black items-center text-center
             w-fit p-1 mt-2 justify-center hover:bg-gray-600 hover:text-white"
          >
            Create profile
          </button>
        </form>
      </Container>
    );
  }
}
