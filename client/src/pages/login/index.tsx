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
import Aurora from "@/components/Bits/Aurora/Aurora";

export function LoginComponent() {
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate({
      to: "/dashboard",
    });
  };

  return (
    <div className="left-0 top-0 w-full h-full fixed">
      <Aurora
        colorStops={["#211C84", "#4D55CC", "#7A73D1"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      <Card className="bg-neutral-900 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-lg border-neutral-800 text-white">
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
              to={"/sign-up"}
            >
              Sign Up
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
