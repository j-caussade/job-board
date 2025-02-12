import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4">
      <ul className="flex gap-8">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/login">Log in</Link>
        </li>
      </ul>
    </nav>
  );
}
