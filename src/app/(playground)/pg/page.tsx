import { promises as fs } from "fs";
import path from "path";
import { ALink, AMain } from "~/app/(playground)/pg/inner-tools";

async function getPlaygroundRoutes() {
  const playgroundDir = path.join(process.cwd(), "src/app/(playground)/pg");
  const entries = await fs.readdir(playgroundDir, { withFileTypes: true });

  const routes = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const fullPath = path.join(playgroundDir, entry.name);
        const files = await fs.readdir(fullPath);
        if (files.includes("page.tsx")) {
          const entryName = entry.name
            .replaceAll("[", "_")
            .replaceAll("]", "_");
          return `/pg/${entryName}`;
        }
        return null;
      }),
  );

  return routes.filter((route) => route !== null);
}

export default async function Page() {
  const routes = await getPlaygroundRoutes();

  return (
    <AMain>
      <h2 className="font-bold">playground</h2>
      <ul className="space-y-2">
        {routes.map((route) => (
          <li key={route}>
            <ALink href={route}>{route}</ALink>
          </li>
        ))}
      </ul>
    </AMain>
  );
}
