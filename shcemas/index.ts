import * as z from "zod";

export const LoginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(1,{
        message:"Password is required"
    }),
})
export const SignupSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6,{
        message:"There Should be Minimum 6 Chracters"
    }),
    name:z.string().min(3,{
        message:"Name should be atlest of 3 characters"
    })

})