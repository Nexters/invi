import { defineConfig } from "drizzle-kit";

import { env } from "~/lib/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
