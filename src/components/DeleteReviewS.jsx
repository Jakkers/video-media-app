import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "@radix-ui/themes";
import { AlertDialog, Flex } from "@radix-ui/themes";


export default function deleteButton({ userId, review, params, user_id }) {

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
    revalidatePath(`/tv-page/${params}`);
    redirect(`/tv-page/${params}`);
  }

  if (userId === user_id) {
    return (
      <>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button variant="solid" color="red">
              <MdOutlineDeleteOutline />
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Delete review</AlertDialog.Title>
            <AlertDialog.Description size="2">
              Are you sure? This review will be deleted permanently.
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button variant="solid" color="red">
                  <form action={handleSubmit}>
                    <button type="submit">
                      {" "}
                      <MdOutlineDeleteOutline />
                    </button>
                  </form>
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </>
    );
  } else {
    return <></>;
  }
}
