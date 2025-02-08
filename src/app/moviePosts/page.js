import { db } from "@/utils/dbConnection";
import Link from "next/link";
import Image from "next/image";

export default async function MoviePostsPage({ searchParams }) {
  const query = await searchParams;
  console.log("searchParams", query);

  const movies = await db.query(`SELECT * FROM moviePosts`);
  console.log(movies);

  const wrangledMovies = movies.rows;
  console.log(wrangledMovies);
  // reverse the posts array if the sort parameter is set to descending
  if (query.sort === "desc") {
    wrangledMovies.reverse();
  }
  return (
    <>
      <h1 className="text-center text-3xl font-semibold mb-8">
        A list of all our available movies
      </h1>
      <div className="flex justify-center gap-4 mb-8">
        <Link
          href="/moviePosts?sort=asc"
          className="text-emerald-500 hover:text-blue-700"
        >
          Previous(ascending)
        </Link>
        <Link
          href="/moviePosts?sort=desc"
          className="text-emerald-500 hover:text-blue-700"
        >
          Recent(descending)
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {wrangledMovies.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col items-center justify-center p-2 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={movie.src}
              alt={movie.title}
              width={130}
              height={100}
              objectFit="contain"
            />
            <Link href={`/moviePosts/${movie.id}`}>
              <h2 className="mt-4 text-xl font-medium text-center text-gray-800 hover:text-blue-600">
                {movie.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
