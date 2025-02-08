"use client";
import { useState } from "react";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export default function NewComment({ movieId }) {
  const [newUserComment, setnewUserComment] = useState({
    username: "",
    comment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/new-comment", {
        method: "POST",
        body: JSON.stringify({
          username: newUserComment.username,
          comment: newUserComment.comment,
          postsId: movieId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("Comment added successfully!");
        revalidatePath(`/moviePosts/${movieId}`);
        redirect(`/moviePosts/${movieId}`);
      } else {
        alert("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("An error occurred while adding the comment.");
    }
  };

  function handleInputChange(event) {
    setnewUserComment({
      ...newUserComment,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div>
      <h2 className="text-center text-xl font-semibold mb-4">Add a Comment</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="username" className="mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={newUserComment.username}
          onChange={handleInputChange}
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
          value={newUserComment.comment}
          onChange={handleInputChange}
          required
          className="mb-4 p-2 border border-gray-300 rounded-md"
        ></textarea>

        <button
          type="submit"
          className="bg-emerald-600 text-white py-2 px-4 rounded-md"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
}
