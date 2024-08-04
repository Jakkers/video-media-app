import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
export default async function UserIdPage() {
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

  return (
    <>
      <form action={handleSubmit} className="flex flex-col items-center mt-10">
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
    </>
  );
}
