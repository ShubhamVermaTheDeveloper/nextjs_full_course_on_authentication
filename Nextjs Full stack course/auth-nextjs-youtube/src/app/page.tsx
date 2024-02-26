import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex ml-5 py-8 pt-5 p-6">
      <Link href="/login" className="border bg-blue-300">
        Login
      </Link>
      <Link href="/signup" className="border bg-blue-300">
        signup
      </Link>
      <Link href="/profile" className="border bg-blue-300">
        profile
      </Link>

      <Link
        href={`profile/${Math.random().toString()}`}
        className="border bg-blue-300"
      >
        profile/id
      </Link>
    </main>
  );
}
