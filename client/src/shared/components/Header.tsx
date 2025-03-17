import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { AuthGuard } from "../guards/AuthGuard";
import { UnAuthGuard } from "../guards/UnAuthGuard";
import FlowingMenu from "@/components/Bits/FlowingMenu/FlowingMenu";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const demoItems = [
  {
    link: "#",
    text: "Mojave",
    image: "https://picsum.photos/600/400?random=1",
  },
  {
    link: "#",
    text: "Sonoma",
    image: "https://picsum.photos/600/400?random=2",
  },
  {
    link: "#",
    text: "Monterey",
    image: "https://picsum.photos/600/400?random=3",
  },
  {
    link: "#",
    text: "Sequoia",
    image: "https://picsum.photos/600/400?random=4",
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOverlayRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Animation for menu visibility
  useEffect(() => {
    if (menuOverlayRef.current) {
      if (isMenuOpen) {
        gsap.set(menuOverlayRef.current, {
          visibility: "visible",
          display: "block", // Changed to block to ensure proper event bubbling
        });
        gsap.to(menuOverlayRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(menuOverlayRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(menuOverlayRef.current, {
              visibility: "hidden",
              display: "none",
            });
          },
        });
      }
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="flex items-center justify-between border-b pb-4 border-neutral-800 w-full max-w-4xl m-[20px_auto_0px_auto]">
        <span>enndy</span>
        <div className="flex flex-row gap-3">
          <Link to="/">
            <Button
              className="cursor-pointer"
              variant={"neutralGhost"}
              size={"sm"}
            >
              Home
            </Button>
          </Link>
          <AuthGuard>
            <Link to="/dashboard">
              <Button
                className="cursor-pointer"
                variant={"neutralGhost"}
                size={"sm"}
              >
                Dashboard
              </Button>
            </Link>
          </AuthGuard>
          <UnAuthGuard>
            <div className="flex space-x-2">
              <Link to="/login">
                <Button
                  className="cursor-pointer"
                  variant={"neutralGhost"}
                  size={"sm"}
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button
                  className="cursor-pointer"
                  variant={"neutralGhost"}
                  size={"sm"}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </UnAuthGuard>
        </div>

        {/* Burger Menu Button */}
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center w-6 h-6 space-y-1 z-20"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? "transform rotate-45 translate-y-1.5" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? "transform -rotate-45 -translate-y-1.5" : ""}`}
          ></span>
        </button>
      </header>

      {/* Full-screen FlowingMenu container */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-40 bg-black"
        style={{
          visibility: "hidden",
          opacity: 0,
          display: "none",
          pointerEvents: isMenuOpen ? "auto" : "none", // Important for hover events
        }}
      >
        {/* Make sure close button doesn't interfere with hover events */}
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4 text-white text-2xl p-2 bg-neutral-800 rounded-full h-10 w-10 flex items-center justify-center z-50"
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* FlowingMenu container with full height */}
        <div className="w-full h-full">
          <FlowingMenu items={demoItems} />
        </div>
      </div>
    </>
  );
}
