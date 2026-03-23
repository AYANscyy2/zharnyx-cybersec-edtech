import { createAuthClient } from "better-auth/react";
import type { Session, auth } from "./auth";

export const authClient = createAuthClient<typeof auth>();

export const { signIn, signUp, signOut, useSession } = authClient;

export type { Session };
