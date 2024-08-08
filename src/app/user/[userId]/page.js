import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Header from "@/components/Header";
import { Container, Flex, Card, Heading, Text, Strong } from "@radix-ui/themes";
import TitleData from "@/components/ProfileTitleData";
import ImageData from "@/components/ProfileImgReviews";
import ShowImage from "@/components/showsProfileimg";
import ShowTitleData from "@/components/showsProfileTitle";

//? react icons
import { GiCosmicEgg } from "react-icons/gi";
import { MdEgg } from "react-icons/md";
import { GiEggEye } from "react-icons/gi";
import { FaTheRedYeti } from "react-icons/fa";
import { FaThemeco } from "react-icons/fa";

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
                <Text size={"2"}>You&apos;re Hatching</Text>
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
              <Text size={"2"}>you&apos;ve Got Our Attention</Text>
            </Card>
          ) : null}
          {reviewBadge >= 20 ? (
            <Card>
              <Text
                size={"9"}
                className="flex flex-col text-red-500 items-center "
              >
                <FaTheRedYeti />
              </Text>
              <Text size={"2"}>You&apos;re Growing</Text>
            </Card>
          ) : null}
          {reviewBadge >= 100 ? (
            <Card>
              <Text
                size={"9"}
                className="flex flex-col text-purple-500 items-center "
              >
                <FaThemeco />
              </Text>
              <Text size={"2"}>You&apos;re A Pro</Text>
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
