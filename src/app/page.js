export const metadata = {
  title: "Movie Reviews - homepage",
  description:
    "Welcome to Movie Reviews! Discover the latest films, share your thoughts, and engage with a community of movie lovers.",
};

// import Image from "next/image";
import mainstyles from "./home.module.css";
export default function HomePage() {
  return (
    <div className={mainstyles.main}>
      <h1 className="text-center text-3xl font-semibold mb-8">About us</h1>
      <p>
        Welcome to <em>Movie Reviews</em>, your go-to destination for all things
        movies! Whether you are a casual viewer or a cinema enthusiast, our
        platform offers a space to discover, discuss, and share your thoughts on
        the latest films.
      </p>
      <p>
        At <em>Movie Reviews</em>, we believe that every movie has a story to
        tell, and every viewer has a unique perspective. Our goal is to create a
        community where movie lovers can <em>express their opinions</em>,
        <em>exchange reviews</em>, and <em>explore new films</em>.
      </p>

      <h3>What You Can Do Here:</h3>
      <ul>
        <li>Browse Movies</li>
        <li>read reviews</li>
        <li>Share Your Thoughts</li>
        <li>Join the Conversation</li>
      </ul>

      <p>
        We’re here to make movie-watching a more social and fun experience!
        Whether you're looking for your next favorite movie or want to leave
        feedback on a recent watch, you’ll find the perfect space here at
        <em>Movie Reviews</em>
      </p>
    </div>
  );
}
