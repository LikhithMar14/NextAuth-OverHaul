"use client";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "model" | "redirect";
  asChild?: Boolean;
}
import { useRouter } from "next/navigation";


export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {

    const router = useRouter()
  return (
    <span
      className="cursor-pointer"
      onClick={() =>  router.push('/auth/login')}
    >
      {children}
    </span>
  );
};
