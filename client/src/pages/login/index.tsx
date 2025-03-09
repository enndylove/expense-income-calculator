import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "@tanstack/react-router";
import { LoginForm } from "./components/LoginForm";

export function LoginComponent() {
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate({
      to: "/",
    });
  };

  return (
    <Card className="bg-neutral-900 min-w-lg border-neutral-800 text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Login to your account
        </CardTitle>
        <CardDescription className="text-center">
          Login to your account for full use service
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm onSuccess={onSuccess} />
      </CardContent>
      <CardFooter>
        <span className="text-sm w-full text-center text-neutral-500">
          Dont have account?{" "}
          <Link
            className="text-blue-600 transition-all delay-150 hover:text-blue-800"
            to={"/"} // @TODO: Sign-up pages
          >
            Sign Up
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
}
