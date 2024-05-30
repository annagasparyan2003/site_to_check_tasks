"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "@/components/auth/login-form";
const LoginButton = ({ children, mode = "redirect", asChild, }) => {
    const router = useRouter();
    const handleLogin = () => {
        router.push("/auth/login");
    };
    if (mode === "modal") {
        return (<Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>);
    }
    return (<span onClick={handleLogin} className="cursor-pointer">
      {children}
    </span>);
};
export default LoginButton;
