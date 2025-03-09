import { AlertCircle } from "lucide-react";
import { Button } from "@/components/Shadcn/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Shadcn/Card";
import { useNavigate } from "@tanstack/react-router";

export function ErrorComponent({ error }: { error: Error }) {
  const navigate = useNavigate();

  const getErrorMessage = (error: Error) => {
    if (
      error.cause &&
      typeof error.cause === "object" &&
      "status" in error.cause
    ) {
      switch (error.cause.status) {
        case 401:
          return "You're not authorized to view this page. Please log in and try again.";
        case 403:
          return "You don't have permission to access this resource.";
        case 500:
          return "Something went wrong on our end. We're working on fixing it.";
        default:
          return error.message || "An unexpected error occurred.";
      }
    }
    return error.message || "An unexpected error occurred.";
  };

  const hasStatus: boolean =
    error &&
    "cause" in error &&
    error.cause &&
    typeof error.cause === "object" &&
    "status" in error.cause &&
    typeof error.cause.status === "string"
      ? true
      : false;

  return (
    <main className="flex-1 flex w-full items-center justify-center p-4 bg-gray-50/50">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center pb-2">
          <div className="w-12 h-12 rounded-full bg-red-100 mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl text-red-600">
            Something went wrong
          </CardTitle>
          <CardDescription className="mt-4">
            {getErrorMessage(error)}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-gray-500">
          {hasStatus && (
            <p>Error Code: {(error.cause as any).status as string}</p>
          )}
        </CardContent>
        <CardFooter className="flex gap-2 justify-center">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
          <Button onClick={() => navigate({ to: "/" })}>Return Home</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
