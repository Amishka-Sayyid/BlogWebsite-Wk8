import { db } from "@/utils/dbConnection";

export async function POST(req) {
  const { username, comment, postsId } = await req.json();

  const result = await db.query(
    `INSERT INTO comments (username, comment, postsId) VALUES ($1, $2, $3) RETURNING *`,
    [username, comment, postsId]
  );

  if (result.rows.length) {
    return new Response(
      JSON.stringify({
        message: "Comment added successfully!",
        comment: result.rows[0],
      }),
      { status: 200 }
    );
  }

  return new Response(JSON.stringify({ message: "Failed to add comment." }), {
    status: 400,
  });
}
