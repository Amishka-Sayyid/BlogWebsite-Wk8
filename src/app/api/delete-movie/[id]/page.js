import { db } from "@/utils/dbConnection";

export default async function Delete(req, { params }) {
  const { id } = params;
  console.log(`${id}`);
  try {
    // Check if ID exists
    if (!id) {
      return res.status(400).json({ message: "Movie ID is required" });
    }
    // Deleting
    const result = await db.query("DELETE FROM moviePosts WHERE id = $1", [id]);

    // Check if a movie was deleted
    if (result.rowCount > 0) {
      return new Response(
        JSON.stringify({ message: "Movie deleted successfully" }),
        { status: 200 }
      );
    }
    // If no rows were deleted
    return new Response(JSON.stringify({ message: "Movie not found" }), {
      status: 404,
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
