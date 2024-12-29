"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import  db  from "@/db";
import { SignupSchema } from "@/shcemas";




export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const existingUser = await db.users.findUnique({where:{email}})
  if(existingUser)return {error:"Email already in use!"}
  const hashedPassword = await bcrypt.hash(password,5)

   await db.users.create({
    data:{
    
        name,
        email,
        password:hashedPassword
    }
  });


  return { success: "Singup successful" };

  
};