import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Header from "@/components/Header";
import { Container, Flex, Card, Heading, Text, Strong } from "@radix-ui/themes";
import TitleData from "@/components/ProfileTitleData";
import ImageData from "@/components/ProfileImgReviews";
import Image from "next/image";

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
    await db.query(`SELECT * FROM m_reviews WHERE user_id = $1`, [userId])
  ).rows;

  if (usersData.length > 0) {
    return (
      <Container size="4">
        <Header />

        <Heading size={"8"} className="m-2">
          <Strong>{userData.username} Profile</Strong>
        </Heading>
        <div id="profile-info">
          {Bio.map((item) => (
            <div key={item.id}>
              <Text type="p">Bio: {item.bio}</Text>
            </div>
          ))}
        </div>
        <Flex direction={"column-reverse"} gap={"3"}>
          {reviewData.map((item) => (
            <Card key={item.id}>
              <Flex direction={"row"} gap={"3"}>
                <div>
                  <ImageData ImageData={item.movie_id} />
                </div>
                <div className="flex flex-col overflow-y-scroll w-fit h-fit">
                  <Text>
                    <TitleData TitleData={item.movie_id} />
                  </Text>
                  <br />
                  <Text>{item.review}</Text>
                </div>
              </Flex>
            </Card>
          ))}
          <Heading>Your Reviews</Heading>
        </Flex>
      </Container>
    );
  } else {
    return (
      <Container size="4">
        <Header />
        <h1>Create your Profile</h1>
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
