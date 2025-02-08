import Link from "next/link";
import headerStyles from "../app/header.module.css";
export default function Header() {
  return (
    <header className={headerStyles.header}>
      <h1>Movie reviews</h1>
      <nav>
        <Link href={"/"} className={headerStyles.navLink}>
          Home
        </Link>
      </nav>
    </header>
  );
}
