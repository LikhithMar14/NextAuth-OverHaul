'use client'

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/shcemas";
import { getSession } from "next-auth/react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSucess } from "../form-success";
import { login } from "@/actions/login";
import { signIn } from "next-auth/react"

import { useState, useTransition } from "react";
export const LoginForm = () => {
  const [isPending,startTransisiton] = useTransition()
  const [error,setError] = useState<string | undefined>();
  const [success,setSuccess] = useState<string | undefined>()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    console.log("Clicked");
  
    // Start the login process
    try {
      const data = await login(values); 
      // setError(data.error);
      // setSuccess(data.success);
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred.");
    }
  
    console.log("Login Completed");
    const session = await getSession();
    console.log("Session:", session);
  };
  return (
    <CardWrapper
      headerLabel="welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/signup"
      showSocial={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="jhondoe@gmail.com"
                      type="email"
                      disabled = {isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="********" type="password" disabled = {isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSucess message={success}/>
          <FormError message = {error}/>
          <Button type="submit" className="w-full" variant={"default"} disabled = {isPending}>Login</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
