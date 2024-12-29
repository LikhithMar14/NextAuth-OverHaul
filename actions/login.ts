//Server Actions

"use server";
import * as z from "zod";
import { auth, signIn } from "@/auth";
import { LoginSchema } from "@/shcemas";
import { AuthError } from "next-auth";
import { NextResponse } from "next/server";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validatedFields.data;

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect:false

    });

    console.log(response)

    console.log("Awaited Reponse",response)

  } catch (error) {
    if (error instanceof AuthError) {
        console.log("Went to Catch Block 1")

      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

  const session = await auth()
  console.log(session?.user)
    console.log("Went to Catch Block 2")
    console.log("Error: ",error)

    throw error;
  }

  console.log("User Logged In")


  return { success: "Login Successful" };
};
