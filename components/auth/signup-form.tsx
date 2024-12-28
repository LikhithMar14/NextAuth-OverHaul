"use client";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SignupSchema } from "@/shcemas";
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
import { useState, useTransition } from "react";
import { signup } from "@/actions/signup";
export const SignupForm = () => {
  const [isPending,startTransisiton] = useTransition()
  const [error,setError] = useState<string | undefined>();
  const [success,setSuccess] = useState<string | undefined>()
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values:z.infer<typeof SignupSchema>) =>{
    startTransisiton(()=> signup(values).then((data)=>{
        setError(data.error)
        setSuccess(data.success)  
    }))    
  }
  return (
    <CardWrapper
      headerLabel="Signup to Start the amazing Journey"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/signup"
      showSocial={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field} 
                      placeholder="Jhon Doe"
                      type="text"
                      disabled = {isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <Button type="submit" className="w-full" variant={"default"} disabled = {isPending}>Signup</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
