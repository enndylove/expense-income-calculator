import Squares from "@/components/Bits/Squares/Squares";

export function BackgroundGrid() {
  return (
    <div className="w-full left-0 top-0 h-full fixed -z-50 opacity-20">
      <Squares
        direction={"up"}
        speed={0}
        squareSize={34}
        hoverFillColor={"#99a1af"}
        borderColor={"#99a1af"}
      />
    </div>
  );
}
