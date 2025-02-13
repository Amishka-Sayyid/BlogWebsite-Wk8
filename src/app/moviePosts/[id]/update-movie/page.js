import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function UpdateMovie({ params }) {
  const slug = await params;
  const oneMovie = await db.query(`SELECT * FROM moviePosts WHERE id = $1`, [
    slug.id,
  ]);

  console.log(oneMovie);

  //   wrangle
}
