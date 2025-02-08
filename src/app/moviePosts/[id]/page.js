import { db } from "@/utils/dbConnection";
import Link from "next/link";
import Image from "next/image";
import NewComment from "../../../components/NewComment";
export default async function SingleMoviePage({ params }) {
  const { id } = params;

  const movie = await db.query(`SELECT * FROM moviePosts WHERE id = $1`, [id]);

  if (movie.rows.length === 0) {
    return <h1>Movie not found</h1>;
  }

  const wrangledMovie = movie.rows[0];
  console.log(wrangledMovie);

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

        <Link
          href="/moviePosts"
          className="text-emerald-500 hover:text-blue-700"
        >
          Back to Movies
        </Link>
      </div>

      <div>
        <NewComment movieId={wrangledMovie.id} />
      </div>
    </div>
  );
}
