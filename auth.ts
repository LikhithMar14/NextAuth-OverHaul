import NextAuth , { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/shcemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: {label:"Email",type:"email"},

        password: {label: "Password", type: "password"},
      },
  
      async authorize(credentials) {
        try {
          console.log("In auth.ts")
          console.log("Recieved Credentails: ",credentials)
          const validatedFields = LoginSchema.safeParse(credentials);
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const user = await getUserByEmail(email);
            console.log(user)
            if (!user || !user.password) return null;

            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log("Consoling the User in the auth.ts File: ", user);
            
            
            if (passwordMatch) {
              console.log("Just before returning user");
              console.log("password")
              return user
            }
          }
          console.log("Returning Null")
          return null;
        } catch (error) {

          console.log("IN auth.ts error block")
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
});
