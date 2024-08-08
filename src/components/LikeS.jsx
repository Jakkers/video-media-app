import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@radix-ui/themes";
import { SlLike } from "react-icons/sl";

export default function LikeButtonS({ id, likes, userId }) {
  async function handleSubmit() {
    "use server";
    const db = dbConnect();
    await db.query(
      `UPDATE s_reviews
SET likes = ${likes} +1
WHERE id = $1`,
      [id]
    );
    revalidatePath(`/user/${userId}`);
    redirect(`/user/${userId}`);
  }

  return (
    <>
      <form action={handleSubmit}>
        <Button
          size={"1"}
          color="blue"
          className="flex bg-blue-600 rounded text-white items-center text-center
             w-fit justify-center p-1 text-xs hover:bg-blue-200 hover:text-blue-600"
          type="submit"
        >
          <SlLike />
        </Button>
      </form>
    </>
  );
}
