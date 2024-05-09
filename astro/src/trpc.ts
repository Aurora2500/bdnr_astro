import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "../../server/src/trpc.ts";

export const trpc = createTRPCReact<AppRouter>();