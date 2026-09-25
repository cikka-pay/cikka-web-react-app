import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface LiquidButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  text?: string;
  href?: string;
  variant?: "black" | "white" | "glass";
  showArrow?: boolean;
  arrowIcon?: React.ReactNode;
  badgeBg?: string;
  arrowColor?: string;
  className?: string;
  magnetic?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function LiquidButton({
  children,
  text = "Get started now",
  href = "#",
  variant = "black",
  showArrow = true,
  arrowIcon,
  badgeBg,
  arrowColor,
  className,
  magnetic = true,
  onClick,
  ...props
}: LiquidButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    
    // Magnetic pull
    if (magnetic) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - centerX) * 0.18,
        y: (e.clientY - centerY) * 0.22,
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  const isBlack = variant === "black";

  return (
    <a
      ref={buttonRef}
      href={href}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        isolation: "isolate",
      }}
      className={cn(
        "group relative inline-flex items-center justify-between gap-4 rounded-full pl-7 pr-2 py-2 text-base font-bold shadow-md cursor-pointer select-none overflow-hidden transition-all duration-300 active:scale-95",
        isBlack
          ? "bg-black border border-white/10"
          : "bg-white text-black border border-black/10",
        className
      )}
      {...props}
    >
      {/* Expanding Liquid Circle from Cursor Entry Point */}
      <span
        style={{
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
          transition: "transform 0.65s cubic-bezier(0.19, 1, 0.22, 1)",
        }}
        className={cn(
          "pointer-events-none absolute w-[360px] h-[360px] rounded-full z-0 will-change-transform",
          isBlack ? "bg-white" : "bg-black"
        )}
      />

      {/* Button Text with Contrast Difference Blending */}
      <span
        style={{
          mixBlendMode: "difference",
        }}
        className={cn(
          "relative z-10 font-bold tracking-tight text-white transition-transform duration-300 group-hover:translate-x-0.5",
          !isBlack && "text-black"
        )}
      >
        {children || text}
      </span>

      {/* Right Circular Badge with Rotating Diagonal Arrow */}
      {showArrow && (
        <span
          className={cn(
            "relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:scale-105 shadow-sm shrink-0",
            badgeBg || "bg-[#e2e8f0] text-[#7c3aed]",
            arrowColor
          )}
        >
          {arrowIcon || <span>↗</span>}
        </span>
      )}
    </a>
  );
}
