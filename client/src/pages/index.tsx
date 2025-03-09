import BlurText from "@/components/Bits/BlurText/BlurText";
import ShinyText from "@/components/Bits/ShinyText/ShinyText";
import { Link } from "@tanstack/react-router";

export function HomeComponent() {
  return (
    <div className="w-full min-h-lvh flex flex-col items-center justify-center">
      <BlurText
        text="Income and expense calculator"
        delay={60}
        animateBy="words"
        direction="top"
        className="text-5xl text-white font-sans font-semibold"
      />

      <Link to={"/login"}>
        <ShinyText
          text="🚀 Just some shiny text!"
          disabled={false}
          speed={5}
          className="mt-6 text-lg font-sans"
        />
      </Link>
    </div>
  );
}
