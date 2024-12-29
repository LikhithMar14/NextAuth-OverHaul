"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import  db  from "@/db";
import { SignupSchema } from "@/shcemas";




export const signup = async (values: z.infer<typeof SignupSchema>) => {


  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("Signup Error")
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const existingUser = await db.user.findUnique({where:{email}})
  if(existingUser)return {error:"Email already in use!"}
  const hashedPassword = await bcrypt.hash(password,5)

   await db.user.create({
    data:{
    
        name,
        email,
        password:hashedPassword
    }
  });

  console.log("Signup Successufl");
  
  return { success: "Signup successful" };

  
};