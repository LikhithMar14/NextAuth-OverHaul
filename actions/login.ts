//Server Actions

"use server";
import * as z from "zod";
import { auth, signIn } from "@/auth";
import { LoginSchema } from "@/shcemas";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  console.log("Entered Login")
  const { email, password } = validatedFields.data;
  console.log(email," ",password)

  try {
    const response = await signIn("credentials", {
      email,
      password, 
      redirect:false,
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

    console.log("Went to Catch Block 2")
    console.log("Error: ",error)

    throw error;
  }
  const session = await auth()
  console.log(session?.user)
  console.log("User Logged In")


  return { success: "Login Successful" };
};
