import BlurText from "@/components/Bits/BlurText/BlurText";
import ShinyText from "@/components/Bits/ShinyText/ShinyText";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export function HomeComponent() {
  return (
    <div className="max-w-7xl w-full mx-auto my-0">
      <Link
        className={cn(
          "mb-2",
          buttonVariants({ variant: "neutralGhost", size: "icon" }),
        )}
        to={"/login"}
      >
        <ShinyText
          text="🚀"
          disabled={false}
          speed={5}
          className="text-lg font-normal"
        />
      </Link>
      <BlurText
        text="Income and expense calculator"
        delay={60}
        animateBy="words"
        direction="top"
        className="text-5xl text-white font-sans font-semibold"
      />

      <Link
        className={cn(
          "!bg-blue-700 !text-white mt-4",
          buttonVariants({ variant: "neutralGhost", size: "lg" }),
        )}
        to={"/login"}
      >
        Start now
        {/* <ShinyText
          text="🚀 Start now!"
          disabled={false}
          speed={5}
          className="text-lg font-normal"
        /> */}
      </Link>
    </div>
  );
}
