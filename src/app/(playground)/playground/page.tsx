import { promises as fs } from "fs";
import Link from "next/link";
import path from "path";

async function getPlaygroundRoutes() {
  const playgroundDir = path.join(
    process.cwd(),
    "src/app/(playground)/playground",
  );
  const entries = await fs.readdir(playgroundDir, { withFileTypes: true });

  const routes = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const fullPath = path.join(playgroundDir, entry.name);
        const files = await fs.readdir(fullPath);
        if (files.includes("page.tsx")) {
          return `/playground/${entry.name}`;
        }
        return null;
      }),
  );

  return routes.filter((route) => route !== null);
}

export default async function Page() {
  const routes = await getPlaygroundRoutes();

  return (
    <main className="mx-auto w-full max-w-2xl space-y-20 px-10 pt-20">
      <h2 className="font-bold">playground</h2>
      <ul className="space-y-2">
        {routes.map((route) => (
          <li key={route}>
            <Link href={route} className="text-blue-500 hover:underline">
              {route}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
