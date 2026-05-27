import React, { useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme.context";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        {
          rotation: isDark ? -180 : 180,
          scale: 0.2,
          opacity: 0,
        },
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isDark]);

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggleTheme}
      className="rounded-full p-2 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 transition-all duration-300 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
    >
      <div ref={iconRef}>
        {isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
