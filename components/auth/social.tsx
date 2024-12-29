"use client"

import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react";


export const Social = () =>{
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button size={"lg"} className="w-full" variant={"outline"} onClick={()=>{signIn("google")}}><FcGoogle className="h-5 w-5"/></Button>
            <Button size={"lg"} className="w-full" variant={"outline"} onClick={()=>{signIn("github")}}><FaGithub className="h-5 w-5"/></Button>
        </div>
    )
}