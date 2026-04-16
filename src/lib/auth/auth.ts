import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";

export type Role = "admin" | "mentor" | "student" | "recruiter" | "partner_agency";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "student",
        input: false, // Don't allow setting role during signup
      },
      phone: { type: "string", required: false },
      city: { type: "string", required: false },
      studentStatus: { type: "string", required: false },
      preferredTrack: { type: "string", required: false },
      collegeName: { type: "string", required: false },
      message: { type: "string", required: false },
      imageUrl: { type: "string", required: false },
    },
  },
});

export type Session = typeof auth.$Infer.Session.session & {
  user: typeof auth.$Infer.Session.user & {
    role: Role;
  };
};
