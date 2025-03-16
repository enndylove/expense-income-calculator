import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "@tanstack/react-router";
import { SignUpForm } from "./components/SignUpForm";
import Aurora from "@/components/Bits/Aurora/Aurora";
import { useAuth } from "@/shared/hooks/useAuth";

export function SignUpComponent() {
  const navigate = useNavigate();

  const auth = useAuth();

  if (auth.isLoggedIn) {
    navigate({
      to: "/dashboard",
    });
  }

  const onSuccess = () => {
    navigate({
      to: "/login",
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
          <CardTitle className="text-2xl text-center">Sign up</CardTitle>
          <CardDescription className="text-center">
            Create your account for full use service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm onSuccess={onSuccess} />
        </CardContent>
        <CardFooter>
          <span className="text-sm w-full text-center text-neutral-500">
            Already have a account?{" "}
            <Link
              className="text-blue-600 transition-all delay-150 hover:text-blue-800"
              to={"/login"}
            >
              Sign In
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
