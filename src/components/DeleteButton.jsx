"use client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }) {
  const [remove, setremove] = useState(false);
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      setremove(true);
      try {
        const res = await fetch(`/api/delete-movie/${id}`, {
          method: "DELETE",
        });

        // Check if the request was successful
        if (res.ok) {
          alert("Movie deleted successfully");
          revalidatePath("/moviePosts");

          redirect("/moviePosts");
        } else {
          alert("Failed to delete the movie");
        }
      } catch (error) {
        console.error("Error deleting movie:", error);
        alert("An error occurred while deleting the movie.");
      } finally {
        setremove(false);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={remove}
        className="text-red-600 hover:text-red-800"
      >
        delete
      </button>
    </>
  );
}
