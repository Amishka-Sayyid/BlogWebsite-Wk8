export const metadata = {
  title: "Movie Reviews - Add a New Movie",
  description: "Easily contribute new movies to our expanding database.",
};

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewMoviePage() {
  async function handleSubmit(formValues) {
    "use server";

    const title = formValues.get("title");
    const content = formValues.get("content");
    const src = formValues.get("src");

    db.query(
      `INSERT INTO moviePosts (title, content, src) VALUES ($1, $2, $3)`,
      [title, content, src]
    );

    revalidatePath("/moviePosts");

    redirect("/moviePosts");
  }

  return (
    <>
      <div className="flex justify-center flex-col items-center py-12 px-4 sm:px-6 lg:px-8 mx-auto w-full ">
        <div className="flex flex-col items-center justify-center w-full sm:w-[500px] max-w-lg p-8  rounded-lg shadow-lg bg-white">
          <h1 className="text-center text-2xl font-semibold mb-8 text-emerald-700">
            Add New Movie to Website
          </h1>

          <form
            action={handleSubmit}
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
              className="w-full p-3 mb-4 text-gray-800 rounded-md border-2 border-emerald-100 h-32  "
            />
            <button
              type="submit"
              className="w-full py-3 px-4 mt-4 text-white bg-emerald-600 rounded-md shadow-lg hover:bg-emerald-500 "
            >
              Submit new movie
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
