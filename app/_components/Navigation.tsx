import Link from "next/link";
import Image from "next/image";
import { auth } from "@/app/_lib/auth";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        {session?.user?.image ? (
          <li>
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex gap-4 items-center"
            >
              <Image
                src={session.user.image}
                alt={session.user.name || ""}
                width={32}
                height={32}
                className="rounded-full"
                referrerPolicy="no-referrer"
              />
              Guest area
            </Link>
          </li>
        ) : (
          <li>
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
