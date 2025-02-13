export const metadata = {
  title: "Movie Reviews - Movie Details",
  description:
    "Discover the details of this movie, read its description, and share your thoughts with other movie lovers.",
};

import { db } from "@/utils/dbConnection";
import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SingleMoviePage({ params }) {
  const { id } = params;

  const movie = await db.query(`SELECT * FROM moviePosts WHERE id = $1`, [id]);

  if (movie.rows.length === 0) {
    return <h1>Movie not found</h1>;
  }

  const wrangledMovie = movie.rows[0];
  console.log(wrangledMovie);

  // user comment  handling formvalues
  async function handleSubmit(formValues) {
    "use server";

    const username = formValues.get("username");
    const comment = formValues.get("comment");
    const movieId = id;

    await db.query(
      `INSERT INTO comments (username, comment, postsId) VALUES ($1, $2, $3)`,
      [username, comment, movieId]
    );

    revalidatePath(`/moviePosts/${movieId}`);
    redirect(`/moviePosts/${movieId}`);
  }

  // comments

  const comments = await db.query(`SELECT * FROM comments WHERE postsId = $1`, [
    id,
  ]);

  const wrangledComments = comments.rows;

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1>{wrangledMovie.title}</h1>
        <Image
          src={wrangledMovie.src}
          alt={wrangledMovie.title}
          width={400}
          height={300}
          objectFit="contain"
        />
        <p>{wrangledMovie.content}</p>

        <nav>
          <button>
            <Link
              href="/moviePosts"
              className="text-emerald-500 hover:text-blue-700 w-full mt-6 p-1 rounded-md border-2 bg-blue-300"
            >
              Back to Movies
            </Link>
          </button>
          <button>
            <Link
              href={`/moviePosts/${wrangledMovie.id}/delete-movie`}
              className="w-full  mt-6 p-1 text-gray-800 rounded-md border-2 bg-red-300 "
            >
              delete-movie
            </Link>
          </button>
        </nav>
      </div>

      <div>
        <div>
          <form action={handleSubmit}>
            <fieldset className="flex flex-col items-center border-spacing-1 border-2 border-gray-300 rounded-md w-full p-6">
              <legend className="text-xl font-bold mb-4;">Comment:</legend>
              <label htmlFor="username" className="mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="mb-4 p-2 border border-gray-300 rounded-md"
              />

              <label htmlFor="comment" className="mb-2">
                Comment
              </label>
              <textarea
                type="text"
                id="comment"
                name="comment"
                required
                className="mb-4 p-2 border border-gray-300 rounded-md h-32"
              ></textarea>

              <button
                type="submit"
                className="bg-emerald-600 text-white py-2 px-4 rounded-md"
              >
                Submit Comment
              </button>
            </fieldset>
          </form>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-lg">
          {wrangledComments.length > 0 ? (
            wrangledComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white p-4 rounded-lg shadow-sm mb-4 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {comment.username}
                </h3>
                <p className="text-gray-600 text-base">{comment.comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}
