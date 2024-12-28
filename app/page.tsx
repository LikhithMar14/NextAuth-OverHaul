import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";




const font = Poppins({
  subsets:["latin"],
  weight:["600"]
})
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-blue-600">
      <div className="space-y-6 text-center">
          <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}>Auth</h1>
        <p className="text-white text-lg ">A simple authentication service</p>

        <div>
          <LoginButton >
          <Button variant={"secondary"} size="lg">Signin</Button>
          </LoginButton>
        </div>
      </div>

    </main>
  );
}
