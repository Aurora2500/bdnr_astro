import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "../../server/src/router";
export type {InferOutput} from "../../server/src/router";

export const trpc = createTRPCReact<AppRouter>();