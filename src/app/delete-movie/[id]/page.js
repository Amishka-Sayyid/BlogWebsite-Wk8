import { db } from "@/utils/dbConnection";

export default async function handleDelete(req, res) {
  const { id } = req.query;

  try {
    // Deleting
    const result = await db.query("DELETE FROM moviePosts WHERE id = $1", [id]);

    // returning success if deleted
    if (result.rowCount > 0) {
      return res.json({ message: "Movie deleted successfully" });
    }

    // If no rows were deleted
    return res.json({ message: "Movie not found" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    return res.json({ message: " server error" });
  }
}
