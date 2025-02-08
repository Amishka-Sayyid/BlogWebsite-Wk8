import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewComment({ movieId }) {
  async function handleSubmit(formValues) {
    "use server";

    const username = formValues.get("username");
    const comment = formValues.get("comment");
    const postsId = movieId;

    db.query(
      `INSERT INTO moviePosts (username, comment, postsId) VALUES ($1, $2, $3)`,
      [username, comment, postsId]
    );
    revalidatePath("/moviePosts/${movieId}");

    redirect("/moviePosts/${movieId}");
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full sm:w-[500px] max-w-lg p-8  rounded-lg shadow-lg bg-white">
        <h1 className="text-center text-2xl font-semibold mb-8 text-emerald-700">
          Add comment
        </h1>

        <form
          action={handleSubmit}
          className="flex flex-col justify-center items-center border-2 border-solid border-gray-500 w-full max-w-3xl p-8 rounded-lg shadow-lg bg-white"
        >
          <label htmlFor="username" className="text-lg font-medium mb-2">
            username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Write your username here "
            required
            className="w-full p-3 mb-4 text-gray-800 rounded-md border-2 border-emerald-100   "
          />
          <label htmlFor="comment" className="text-lg font-medium mb-2">
            comment:
          </label>
          <textarea
            type="text"
            name="comment"
            id="comment"
            placeholder="Write your comment here"
            required
            className="w-full p-3 mb-4 text-gray-800 rounded-md border-2 border-emerald-100 h-32  "
          />
          {/* hidden */}
          <input type="hidden" name="postsId" value={movieId} />
          <button
            type="submit"
            className="w-full py-3 px-4 mt-4 text-white bg-emerald-600 rounded-md shadow-lg hover:bg-emerald-500 "
          >
            Submit comment
          </button>
        </form>
      </div>
    </>
  );
}
