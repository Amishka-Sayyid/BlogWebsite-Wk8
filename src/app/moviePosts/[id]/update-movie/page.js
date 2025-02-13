import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function UpdateMovie({ params }) {
  const slug = await params;
  const oneMovie = await db.query(`SELECT * FROM moviePosts WHERE id = $1`, [
    slug.id,
  ]);

  console.log(oneMovie);

  //   wrangling the data
  const wrangledMovie = oneMovie.rows[0];
  console.log(wrangledMovie);

  async function handleUpdate(formData) {
    "use server";

    //access the input value first

    const title = formData.get("title");
    const content = formData.get("content");
    const src = formData.get("src");

    await db.query(
      `UPDATE moviePosts SET title = $1, content = $2, src= $3 WHERE id=$4`,
      [title, content, src, slug.id]
    );

    revalidatePath("/moviePosts");
    revalidatePath(`/moviePosts/${slug.id}`);
    redirect(`/moviePosts/${slug.id}`);
  }

  return (
    <>
      <div className="flex justify-center flex-col items-center py-12 px-4 sm:px-6 lg:px-8 mx-auto w-full ">
        <div className="flex flex-col items-center justify-center w-full sm:w-[500px] max-w-lg p-8  rounded-lg shadow-lg bg-white">
          <h1 className="text-center text-2xl font-semibold mb-8 text-emerald-700">
            update Movie
          </h1>
          <form
            action={handleUpdate}
            className="flex flex-col justify-center items-center border-2 border-solid border-gray-500 w-full max-w-3xl p-8 rounded-lg shadow-lg bg-white"
          >
            <label htmlFor="title" className="text-lg font-medium mb-2">
              movie title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Write the title here"
              defaultValue={wrangledMovie.title}
              required
              className="w-full p-3 mb-4 text-gray-800 rounded-md border-2 border-emerald-100   "
            />
            <label htmlFor="content" className="text-lg font-medium mb-2">
              synopsis/content:
            </label>
            <textarea
              type="text"
              name="content"
              id="content"
              placeholder="Write the synopsis here"
              defaultValue={wrangledMovie.content}
              required
              className="w-full p-3 mb-4 text-gray-800 rounded-md border-2 border-emerald-100 h-32  "
            />
            <label htmlFor="src" className="text-lg font-medium mb-2">
              image src/link:
            </label>
            <textarea
              type="text"
              name="src"
              id="src"
              placeholder="Paste the image URL here"
              defaultValue={wrangledMovie.src}
              className="w-full p-3 mb-4 text-gray-800 rounded-md border-2 border-emerald-100 h-32  "
            />
            <button
              type="submit"
              className="w-full py-3 px-4 mt-4 text-white bg-emerald-600 rounded-md shadow-lg hover:bg-emerald-500 "
            >
              update Movie
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
