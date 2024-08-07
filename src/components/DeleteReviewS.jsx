import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "@radix-ui/themes";

export default function deleteButton({ userId, review }) {
  async function handleSubmit() {
    "use server";
    const db = dbConnect();
    await db.query(`DELETE FROM s_reviews WHERE review = $1 RETURNING * `, [
      review,
    ]);
    await db.query(
      `UPDATE m_users
SET reviews_left = reviews_left - 1
WHERE clerk_id = $1`,
      [userId]
    );
    revalidatePath(`/user/${userId}`);
    redirect(`/user/${userId}`);
  }

  return (
    <>
      <form action={handleSubmit}>
        <Button
          color="red"
          className="flex bg-red-600 rounded text-white items-center text-center
             w-fit justify-center p-1 text-xs hover:bg-red-200 hover:text-red-600"
          type="submit"
        >
          <MdOutlineDeleteOutline />
        </Button>
      </form>
    </>
  );
}
